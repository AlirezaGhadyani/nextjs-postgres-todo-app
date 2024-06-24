import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/libs";
import "@/styles/globals.css";
import { ThemeProvider, SessionWrapper } from "@/components/layouts";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "a simple todo application",
};

export default function RootLayout({ children }: ChildrenComponent) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
