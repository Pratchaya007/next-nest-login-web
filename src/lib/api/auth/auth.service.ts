import { RegisterInput } from "@/lib/schemas/auth.schema";
import { api } from "../client";
import { User } from "../user/user.type";

const register = (input: RegisterInput) =>
  api.post<void>("/api/auth/register", input);

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User }>("/api/auth/login", input);

const googleLogin = (idToken: string) => {
  // console.log("SEND idToken:", idToken);
  return api.post<{ accessToken: string; user: User }>("/api/auth/google", {
    idToken,
  });
};

const forgotPassword = (input: unknown) => {
  return api.post<string>("/api/auth/forgot-password", input);
};

const resetPassword = (token: string, password: string) => {
  return api.post<string>("/api/auth/reset-password", { token, password });
};

export const authService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  googleLogin,
};
