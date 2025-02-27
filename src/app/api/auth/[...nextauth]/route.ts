import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };