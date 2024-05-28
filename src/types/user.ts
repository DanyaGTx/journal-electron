export interface IUserInfo {
  userId: string;
  email: string;
  password: string;
  name: string;
}

export interface IUserLoginInfo {
  email: string;
  password: string;
}

export interface IUserInfoApi {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: string[];
  mfa: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, any>;
  registration: string;
  status: boolean;
  targets: Array<{ $id: string; $createdAt: string }>;
}
