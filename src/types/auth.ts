export interface User {
  username: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface ProfileResponse {
  status: number;
  message: string;
  data: UserProfile;
}

export interface BalanceResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  } | null;
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface BannerResponse {
  status: number;
  message: string;
  data: Banner[];
}

export interface ServiceItem {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServicesResponse {
  status: number;
  message: string;
  data: ServiceItem[];
}

export interface TopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  } | null;
}

export interface TransactionData {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: "PAYMENT";
  total_amount: number;
  created_on: string;
}

export interface TransactionResponse {
  status: number;
  message: string;
  data: TransactionData | null;
}

export interface UpdateProfileBody {
  first_name: string;
  last_name: string;
}

export interface UpdateProfileResponse {
  status: number;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  } | null;
}

export interface Transaction {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

interface HistoryData {
  offset: number;
  limit: number;
  records: Transaction[];
}

export interface HistoryResponse {
  status: number;
  message: string;
  data: HistoryData;
}
