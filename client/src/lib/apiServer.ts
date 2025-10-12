"use server";
import axios from "axios";
import { destroySession, getSession } from "./session";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// handle 401
apiServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await destroySession();
     
      window.location.href = '/auth/login'; // Redirect to login page
    
    }
    return Promise.reject(error);
  }
);

export default apiServer;
