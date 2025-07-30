import api from "./api";

export const getProfile = async (token: string) => {
  return api.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
