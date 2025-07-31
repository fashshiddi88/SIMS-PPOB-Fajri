import api from "./api";
import type {
  ProfileResponse,
  BannerResponse,
  ServicesResponse,
} from "../types/auth";

export async function getProfile(): Promise<ProfileResponse> {
  const response = await api.get("/profile");
  return response.data;
}

export async function getBalance() {
  const response = await api.get("/balance");
  return response.data;
}

export async function getBanner(): Promise<BannerResponse> {
  const response = await api.get("/banner");
  return response.data;
}

export const getServices = async (): Promise<ServicesResponse> => {
  const response = await api.get("/services");
  return response.data;
};
