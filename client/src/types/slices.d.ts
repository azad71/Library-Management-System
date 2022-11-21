export interface IAuthState {
  isAuth: boolean;
  currentUser?: ICurrentUser;
  isLoading: boolean;
  error: AuthError;
}

export interface ICurrentUser {
  id: string;
  name: string;
  email: string;
  userType: TUserType;
}

export type TUserType = "USER" | "ADMIN";

export interface IAuthError {
  message: string;
}
