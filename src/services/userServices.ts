import api from "./api";
import type { UserProfile } from "../types/auth";

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get("/profile");
  return response.data.data;
}

export async function getBalance() {
  const response = await api.get("/balance");
  return response.data;
}
