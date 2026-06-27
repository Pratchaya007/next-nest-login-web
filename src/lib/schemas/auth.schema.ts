import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z
    .string({ message: "กรุณากรอกรหัสผ่าน" })
    .min(6, { message: "มากกว่า 6 ตัวอักษร" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email().min(1, "กรุณากรอกอีเมลของท่าน"),
  password: z.string().min(6, "กรุณากรอกรหัสผ่านมากกว่า 6 ตัวอักษร"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updataSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อใหม่เพื่ออัพเดท" }),
});

export type UpdataUser = z.infer<typeof updataSchema>;

export const forgotSchema = z.object({
  email: z.email().min(1, "กรุณากรอกอีเมลของท่าน"),
});

export type ForgotPassword = z.infer<typeof forgotSchema>;

export const resetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "ต้องมีรหัสมากกว่า 6 อักษร" })
      .max(20, { message: "ต้องมีรหัสน้อยกว่า 20 อักษร" }),
    ConfirmPassword: z.string().min(5).max(20),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Password do not match",
    path: ["ConfirmPassword"],
  });

export type ResterPassword = z.infer<typeof resetSchema>;
