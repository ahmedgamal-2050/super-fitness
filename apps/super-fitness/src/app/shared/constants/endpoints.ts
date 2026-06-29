export const BASE_URL = 'https://fitness.elevateegy.com/api/v1';
export const SECONDARY_BASE_URL = 'https://fitness.elevateegy.com/api/v1';
export const ENDPOINTS = {
  HOME: `${BASE_URL}/home`,
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
} as const;
