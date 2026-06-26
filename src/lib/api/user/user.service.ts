import { UpdataUser } from "@/lib/schemas/auth.schema";
import { api } from "../client";

const uploadAvatar = (input: FormData) => {
  return api.patch<string>("/api/user/avatar", input);
};

const updataUserName = (input: UpdataUser) => {
  return api.post<string>("/api/user/update" , input);
};

export const userService = { uploadAvatar , updataUserName};
