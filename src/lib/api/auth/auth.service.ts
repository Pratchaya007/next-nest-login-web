import { RegisterInput } from "@/lib/schemas/auth.schema";
import { api } from "../client";
import { User } from "../user/user.type";

const register = (input: RegisterInput) =>
  api.post<void>("/api/auth/register", input);

const login = (input: unknown) => api.post<{accessToken: string, user: User}>('/api/auth/login', input)

export const authService = { register, login };