import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL ? import.meta.env.VITE_APP_BACKEND_URL : apiUrl,
});
// fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/hunt/list/`)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh token on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        if (!refreshToken) {
          // No refresh token - redirect to login
          localStorage.clear();
          window.location.href = "/user/signIn";
          return Promise.reject(error);
        }

        // Get base URL
        const baseURL = import.meta.env.VITE_APP_BACKEND_URL || apiUrl;
        
        // Try to refresh the token
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem(ACCESS_TOKEN, access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Refresh failed - redirect to login
        console.log("Token refresh failed, redirecting to login");
        localStorage.clear();
        window.location.href = "/user/signIn";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;