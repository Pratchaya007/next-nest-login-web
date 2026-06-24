import { ApiError } from "../api/api.error";
import { ErrorActionResult } from "./action.type";

export const formatActionError = (error: unknown): ErrorActionResult => {
  if (error instanceof ApiError) {
    return { success: false, ...error };
  }
  return {
    success: false,
    message: "Internal server error",
    code: "Internal server error",
  };
};

// จัดการ error จากการยิงข้อมูลใน try catch ให้แสดง error แบบนี้