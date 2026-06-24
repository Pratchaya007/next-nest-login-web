import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z.string({ message: "กรุณากรอกรหัสผ่าน" }).min(6, {message: 'มากกว่า 6 ตัวอักษร'}),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมลของท่าน"),
  password: z.string().min(6, "กรุณากรอกรหัสผ่านมากกว่า 6 ตัวอักษร"),
});

export type LoginInput = z.infer<typeof loginSchema>;
