import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }) {
        const response = await fetch(request);
        if (!response.ok) return null;
        return (await response.json()) ?? null;
      },
    }),
  ],
});
const handler = NextAuth();

export { handler as GET, handler as POST };
