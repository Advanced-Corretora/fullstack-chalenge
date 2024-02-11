import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          const user = await res.json();

          if (res.status === 200 && user.username) {
            return { ...user, name: user.username };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error as any);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          name: user.username,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
