import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      facebookUrl: string;
      instagramUrl: string;
      phoneNumber: string;
      email: string;
    } & DefaultSession["user"];
  }
}
