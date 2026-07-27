export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
}

export type PersonalInfo = Pick<
  SignupPayload,
  'firstName' | 'lastName' | 'email' | 'password' | 'rePassword'
>;
