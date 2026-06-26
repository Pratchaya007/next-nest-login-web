"use server";

import { userService } from "../api/user/user.service";
import { unstable_update } from "../auth/auth";
import { UpdataUser } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";
import { formatActionError } from "./action.util";

export const uploadAvatar = async (file: File): Promise<ActionResult> => {
  const formaData = new FormData();
  formaData.append("avatar", file);
  try {
    // console.log("ก่อนเรียก API");
    const avatarUrl = await userService.uploadAvatar(formaData);
    // console.log("API สำเร็จ", avatarUrl);
    await unstable_update({ user: { avatarUrl } });
    return { success: true };
  } catch (error) {
    return formatActionError(error);
  }
};
// export const updataUserName = async (input: UpdataUser): Promise<ActionResult> => {
//   try {
//     await userService.updataUserName(input);
//     await unstable_update({ user: { name: input.name } });
//     return { success: true };
//   } catch (error) {
//     return formatActionError(error);
//   }
// };

export const updataUserName = async (
  input: UpdataUser,
): Promise<ActionResult> => {
  try {
    await userService.updataUserName(input);
    await unstable_update({
      user: {
        name: input.name,
      },
    });
    return { success: true };
  } catch (error) {
    return formatActionError(error);
  }
};
