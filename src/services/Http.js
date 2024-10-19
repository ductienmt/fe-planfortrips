import axios from "axios";
import { BASE_API } from "../shared/base_api";

const Http = axios.create({
  baseURL: BASE_API,
});

const getAccessToken = () => {
  // Logic to retrieve the access token from local storage or any other secure storage
  return localStorage.getItem("accessToken");
};

Http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
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
