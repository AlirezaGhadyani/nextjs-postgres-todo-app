"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useIsClient } from "@/hooks";

export default function ThemeProvider({ children }: ChildrenComponent) {
  const isClient = useIsClient();

  if (!isClient) return <>{children}</>;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
