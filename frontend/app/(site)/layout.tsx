"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {AuthContextProvider} from "app/context/AuthContext.js";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
      <AuthContextProvider>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
         
          <Lines />
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
         
        </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
