export type ExtendedError = Error & {
  status?: number;
  data?: any;
  isAxiosError?: boolean;
  raw?: any;
};

export function handleApiError(err: any): ExtendedError {
  console.error("API Error Response:", err?.response?.data);

  const message = err?.response?.data?.message || err?.message || "Request failed";

  const customError = new Error(message) as ExtendedError;
  customError.status = err?.response?.status || 500;
  customError.data = err?.response?.data;
  customError.isAxiosError = err?.isAxiosError;
  customError.raw = err;

  return customError;
}
