import { api } from "../client";

const uploadAvatar = (input: FormData) => {
  return api.patch<string>("/api/user/avatar", input);
};

export const userService = { uploadAvatar };
