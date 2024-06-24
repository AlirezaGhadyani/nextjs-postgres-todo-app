"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children }: ChildrenComponent) {
  return <SessionProvider>{children}</SessionProvider>;
}
