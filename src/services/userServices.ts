import api from "./api";
import type { UserProfile } from "../types/auth";

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get("/profile");
  return response.data.data;
}
