export type Role = "USER" | "ADMIN" | "SUPERADMIN";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl: string | null;
  coverUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
