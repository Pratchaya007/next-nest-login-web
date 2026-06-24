"use server";

import { redirect } from "next/navigation";
import { authService } from "../api/auth/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";
import { formatActionError } from "./action.util";

export const register = async (input: RegisterInput): Promise<ActionResult> => {
  try {
    await authService.register(input)
  } catch (error) {
    return formatActionError(error)
  }
  redirect('/login')
};

// export const login = async (input: LoginInput): Promise<ActionResult> => {};
