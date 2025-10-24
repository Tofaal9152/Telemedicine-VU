import axios from "axios";
import { destroySession, getSession } from "./session";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
// handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
     await destroySession();
      window.location.href = '/auth/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
