import axios from "axios";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      console.log("Session expired. Please log in again.");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("username");
      Cookies.remove("position");
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export default api;
