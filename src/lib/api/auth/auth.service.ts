import { RegisterInput } from "@/lib/schemas/auth.schema";
import { api } from "../client";

const register = (input: RegisterInput) =>
  api.post<void>("/api/auth/register", input);


export const authService = { register };