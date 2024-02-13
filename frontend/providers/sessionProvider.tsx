"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children, session }: {children: ReactNode, session: Session | null}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
