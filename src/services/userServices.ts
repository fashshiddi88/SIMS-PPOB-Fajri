import api from "./api";
import type {
  ProfileResponse,
  BannerResponse,
  ServicesResponse,
  TopUpResponse,
  TransactionResponse,
  UpdateProfileBody,
  UpdateProfileResponse,
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

export async function topUpBalance(amount: number): Promise<TopUpResponse> {
  const response = await api.post<TopUpResponse>("/topup", {
    top_up_amount: amount,
  });
  return response.data;
}

export async function createTransaction(
  serviceCode: string
): Promise<TransactionResponse> {
  const response = await api.post<TransactionResponse>("/transaction", {
    service_code: serviceCode,
  });

  return response.data;
}

export async function updateProfile(
  body: UpdateProfileBody
): Promise<UpdateProfileResponse> {
  const response = await api.put<UpdateProfileResponse>(
    "/profile/update",
    body
  );
  return response.data;
}

export async function uploadProfileImage(
  file: File
): Promise<UpdateProfileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.put<UpdateProfileResponse>(
    "/profile/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
