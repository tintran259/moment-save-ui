export interface Expense {
  id:           string;
  userId:       string;
  imageUrl:     string;
  thumbnailUrl: string | null;
  latitude:     number | null;
  longitude:    number | null;
  locationName: string | null;
  amount:       number;
  note:         string | null;
  expenseDate:  string; // YYYY-MM-DD
  createdAt:    string;
}

export interface CreateExpenseRequest {
  imageUrl:      string;
  thumbnailUrl?: string;
  amount:        number;
  note?:         string;
  expenseDate:   string;
  latitude?:     number;
  longitude?:    number;
  locationName?: string;
}

export interface CloudinaryUploadParams {
  cloudName:  string;
  apiKey:     string;
  timestamp:  number;
  signature:  string;
  folder:     string;
  /** Eager transformation string to append to FormData */
  eager:      string;
  uploadUrl:  string;
}

/** Result of a successful Cloudinary upload */
export interface UploadResult {
  imageUrl:     string;
  thumbnailUrl: string;
}

export interface MonthMeta {
  year:  number;
  month: number;
  count: number;
}
