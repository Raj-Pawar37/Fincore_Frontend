export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: string | null;
  metadata: Record<string, unknown>;
  totalNumberRecord: number | null;
}