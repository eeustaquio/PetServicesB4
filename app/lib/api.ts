
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 10000,
});

// Request interceptor

api.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error) => {
    // Log request errors
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log response errors
    if (error.response) {
      console.error("API response error:", error.response.status, error.response.data);
    } else {
      console.error("API error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
