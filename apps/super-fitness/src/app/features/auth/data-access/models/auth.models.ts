export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
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
