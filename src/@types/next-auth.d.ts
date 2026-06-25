import { Role } from "@/lib/api/user/user.type";
import "next-auth";
import 'next-auth/jwt'


// Type User
declare module "next-auth" {
  interface User {
    avatarUrl?: string | null;
    email: string;
    name?: string;
    coverUrl?: string | null;
    role?: Role;
    accessToken: string;
  }
}

// Type Session
declare module 'next-auth/jwt' {
  interface JWT {
    avatarUrl?: string | null;
    email: string;
    name?: string;
    coverUrl?: string | null;
    role?: Role;
    sub: string;
    accessToken:string;
  }
}
