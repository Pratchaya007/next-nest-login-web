import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authService } from "../api/auth/auth.service"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(Credentials) {
        const user = authService.login(this.credentials)
      }
    })
  ],
})