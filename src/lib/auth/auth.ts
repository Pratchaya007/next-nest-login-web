import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "../api/auth/auth.service";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { user, accessToken } = await authService.login(credentials);
        return { ...user, accessToken };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user , trigger , session }) {
      if (user) {
        token.avatarUrl = user.avatarUrl;
        token.name = user.name;
        token.email = user.email;
        token.coverUrl = user.coverUrl;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      if (trigger === 'update' && this.session) {
        token.avatarUrl = session.user.avatarUrl
      }

      return token;
    },
    session({ session ,token }) {
      session.user.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role
      session.user.avatarUrl = token.avatarUrl
      session.user.id = token.sub
      session.user.coverUrl = token.coverUrl

      return session;
    },
  },
});
