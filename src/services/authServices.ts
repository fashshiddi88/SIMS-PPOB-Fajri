import axios from "axios";

const API_URL = "/api/auth";

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
