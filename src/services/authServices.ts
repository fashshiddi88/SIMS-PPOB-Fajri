import api from "./api";
import type {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
} from "../types/auth";

export const registerUser = async (data: RegisterPayload) => {
  return api.post("/registration", {
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
  });
};

export const login = async (data: LoginPayload) => {
  const response = await api.post<LoginResponse>("/login", data);

  const { status, message, data: resData } = response.data;

  if (status !== 0) {
    throw new Error(message);
  }

  return resData;
};
