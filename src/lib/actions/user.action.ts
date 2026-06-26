'use server'

import { userService } from "../api/user/user.service";
import { unstable_update } from "../auth/auth";
import { ActionResult } from "./action.type"
import { formatActionError } from "./action.util";

export const uploadAvatar = async (file: File): Promise<ActionResult> => {
  const formaData = new FormData();
  formaData.append('avatar', file)
  try {
    console.log("ก่อนเรียก API");
    const avatarUrl = await userService.uploadAvatar(formaData);
    console.log("API สำเร็จ", avatarUrl);
    await unstable_update({user: { avatarUrl }})
    return {success: true}
  } catch (error) {
    return formatActionError(error)
  }
}