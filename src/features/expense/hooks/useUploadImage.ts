import { useMutation } from '@tanstack/react-query';
import { expenseApi } from '../api/expense.api';
import { UploadResult } from '@/types/expense.types';

export const useUploadImage = () => {
  const { mutateAsync, isPending: isUploading, isError: isUploadError, error: uploadError, reset: resetUpload } = useMutation({
    mutationFn: async (imageUri: string): Promise<UploadResult> => {
      const params = await expenseApi.getUploadUrl();
      return expenseApi.uploadImageToCloudinary(imageUri, params);
    },
  });

  return { upload: mutateAsync, isUploading, isUploadError, uploadError, resetUpload };
};
