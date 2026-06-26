"use server";

import { redirect } from "next/navigation";
import { authService } from "../api/auth/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";
import { formatActionError } from "./action.util";
import { signIn, signOut } from "../auth/auth";

export const register = async (input: RegisterInput): Promise<ActionResult> => {
  try {
    await authService.register(input);
  } catch (error) {
    return formatActionError(error);
  }
  redirect("/login");
};

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn("credentials", { ...input, redirect: false });
  } catch {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }
  redirect("/");
};

export const logout = async () => {
  await signOut({ redirectTo: '/login'})
}
