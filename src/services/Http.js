import axios from "axios";
import { BASE_API } from "../shared/base_api";
import AuthService from "../context/AuthContext/AuthServiceContext";

const Http = axios.create({
  baseURL: BASE_API,
});

Http.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Http;
