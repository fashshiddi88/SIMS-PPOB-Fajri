import axios from "axios";
const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default api;
