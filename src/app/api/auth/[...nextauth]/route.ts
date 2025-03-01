import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectDB } from "@/utils/db";

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

const handler = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const [firstName, ...lastNameParts] = user.name?.split(" ") || [
              "",
              "",
            ];
            const lastName = lastNameParts.join(" ");

            await User.create({
              email: user.email,
              firstName: firstName || "",
              lastName: lastName || "",
              profilePicture: user.image,
              facebookUrl: "",
              instagramUrl: "",
              phoneNumber: "",
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      try {
        if (session.user?.email) {
          await connectDB();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            // Extend the session.user type with additional properties
            const extendedUser = {
              ...session.user,
              id: dbUser._id.toString(),
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              profilePicture: dbUser.profilePicture,
              facebookUrl: dbUser.facebookUrl,
              instagramUrl: dbUser.instagramUrl,
              phoneNumber: dbUser.phoneNumber,
              email: dbUser.email,
            };
            session.user = extendedUser;
          }
        }
        console.log("Extended session:", session);
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
