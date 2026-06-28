import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "../api/auth/auth.service";
import Google from "next-auth/providers/google";
import { formatActionError } from "../actions/action.util";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { user, accessToken } = await authService.login(credentials);
        return { ...user, accessToken };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const res = await authService.googleLogin(account.id_token!);
        user.accessToken = res.accessToken;
        user.name = res.user.name;
        user.email = res.user.email;
        user.role = res.user.role;
        user.avatarUrl = res.user.avatarUrl;
        user.coverUrl = res.user.coverUrl;
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.avatarUrl = user.avatarUrl;
        token.name = user.name;
        token.email = user.email;
        token.coverUrl = user.coverUrl;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      if (trigger === "update" && session?.user) {
        token.avatarUrl = session.user.avatarUrl ?? token.avatarUrl;
        token.name = session.user.name ?? token.name;
      }
      // console.log({ trigger, session });

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.avatarUrl = token.avatarUrl;
      session.user.id = token.sub;
      session.user.coverUrl = token.coverUrl;

      return session;
    },
  },
});
