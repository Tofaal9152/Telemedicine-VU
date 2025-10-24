import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import TanstackProvider from "@/providers/tanstack-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Telemedicine",
  description: "Speak English Fluently in Just 3 Months",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} />
            {children}
          </ThemeProvider>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}
