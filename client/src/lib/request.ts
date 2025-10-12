// "use server";
// import apiServer from "./apiServer";
// import { handleApiError } from "./handleApiError";

// // GET
// export const fetcher = async <T = any>(url: string): Promise<T> => {
//   try {
//     const res = await apiServer.get<T>(url);
//     return res.data;
//   } catch (err) {
//     throw handleApiError(err);
//   }
// };

// // POST
// export const poster = async <T = any>(url: string, data: any): Promise<T> => {
//   try {
//     const res = await apiServer.post<T>(url, data);
//     return res.data;
//   } catch (err) {
//     throw handleApiError(err);
//   }
// };

// // PUT
// export const putter = async <T = any>(url: string, data: any): Promise<T> => {
//   try {
//     const res = await apiServer.put<T>(url, data);
//     return res.data;
//   } catch (err) {
//     throw handleApiError(err);
//   }
// };

// // PATCH
// export const patcher = async <T = any>(url: string, data: any): Promise<T> => {
//   try {
//     const res = await apiServer.patch<T>(url, data);
//     return res.data;
//   } catch (err) {
//     throw handleApiError(err);
//   }
// };

// // DELETE
// export const deleter = async <T = any>(url: string): Promise<T> => {
//   try {
//     const res = await apiServer.delete<T>(url);
//     return res.data;
//   } catch (err) {
//     throw handleApiError(err);
//   }
// };

import apiClient from "./apiClient";

// GET
export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await apiClient.get<T>(url);
  return res.data;
};

// POST
export const poster = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await apiClient.post<T>(url, data);
  return res.data;
};

// PUT
export const putter = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await apiClient.put<T>(url, data);
  return res.data;
};

// PATCH
export const patcher = async <T = any>(url: string, data: any): Promise<T> => {
  const res = await apiClient.patch<T>(url, data);
  return res.data;
};

// DELETE
export const deleter = async <T = any>(url: string): Promise<T> => {
  const res = await apiClient.delete<T>(url);
  return res.data;
};
