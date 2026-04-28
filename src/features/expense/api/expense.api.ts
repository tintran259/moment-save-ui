import { apiClient } from '@/services/axios';
import {
  CreateExpenseRequest,
  Expense,
  CloudinaryUploadParams,
  MonthMeta,
  UploadResult,
} from '@/types/expense.types';
import { ApiResponse } from '@/types/auth.types';

export interface GetExpensesParams {
  page?:  number;
  limit?: number;
  date?:  string;
  month?: number;
  year?:  number;
}

export interface ExpenseListResponse {
  items: Expense[];
  total: number;
  page:  number;
  limit: number;
}

export const expenseApi = {
  getUploadUrl: async (): Promise<CloudinaryUploadParams> => {
    const { data } = await apiClient.post<ApiResponse<CloudinaryUploadParams>>(
      '/storage/upload-url',
      { folder: 'expenses' },
    );
    return data.data;
  },

  uploadImageToCloudinary: async (
    imageUri: string,
    params: CloudinaryUploadParams,
  ): Promise<UploadResult> => {
    const formData = new FormData();

    formData.append('file', {
      uri:  imageUri,
      type: 'image/jpeg',
      name: `expense_${Date.now()}.jpg`,
    } as unknown as Blob);

    formData.append('api_key',     params.apiKey);
    formData.append('timestamp',   params.timestamp.toString());
    formData.append('signature',   params.signature);
    formData.append('folder',      params.folder);
    formData.append('eager',       params.eager);
    formData.append('eager_async', 'false');

    const response = await fetch(params.uploadUrl, {
      method: 'POST',
      body:   formData,
    });

    if (!response.ok) {
      let reason = `HTTP ${response.status}`;
      try {
        const json = await response.json() as { error?: { message?: string } };
        reason = json?.error?.message ?? reason;
      } catch {
        reason = await response.text().catch(() => reason);
      }
      throw new Error(`Cloudinary upload thất bại: ${reason}`);
    }

    const result = await response.json() as {
      secure_url: string;
      eager?: Array<{ secure_url: string }>;
    };

    return {
      imageUrl:     result.secure_url,
      thumbnailUrl: result.eager?.[0]?.secure_url ?? result.secure_url,
    };
  },

  createExpense: async (payload: CreateExpenseRequest): Promise<Expense> => {
    const { data } = await apiClient.post<ApiResponse<Expense>>('/expenses', payload);
    return data.data;
  },

  getExpenses: async (params: GetExpensesParams = {}): Promise<ExpenseListResponse> => {
    const { data } = await apiClient.get<ApiResponse<ExpenseListResponse>>(
      '/expenses',
      { params },
    );
    return data.data;
  },

  /** Returns the list of months (year+month) that have at least one expense. */
  getAvailableMonths: async (): Promise<MonthMeta[]> => {
    const { data } = await apiClient.get<ApiResponse<MonthMeta[]>>('/expenses/months');
    return data.data;
  },
};
