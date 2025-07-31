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

export interface BalanceResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  } | null;
}
