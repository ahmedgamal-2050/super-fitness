export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface AuthMessageResponse {
  message: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
}

export interface ProfileResponse {
  message: string;
  user: UserProfile;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  createdAt: string;
  resetCodeVerified: boolean;
  passwordChangedAt: string;
}

export interface EditProfileRequest {
  weight?: number;
  goal?: string;
  activityLevel?: string;
}
export interface ProfileResponse {
  message: string;
  user: UserProfile;
}
