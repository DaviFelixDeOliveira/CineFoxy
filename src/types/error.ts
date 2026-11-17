export interface AppError {
  code: string;
  userMessage: string;
  httpStatus?: number;
  canRetry: boolean;
  actionLabel?: string;
}
