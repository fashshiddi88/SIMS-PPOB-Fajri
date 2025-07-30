import axios from "axios";
import { store } from "../store";

const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
