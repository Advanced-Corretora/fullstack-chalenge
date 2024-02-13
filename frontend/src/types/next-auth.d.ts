import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username: string;
    email: string;
  }
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
    } | unknown;
  }
}
