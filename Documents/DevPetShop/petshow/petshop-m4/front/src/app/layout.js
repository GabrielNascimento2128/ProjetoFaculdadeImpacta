import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Suspense } from "react";

const latoSans = Lato({
  subsets: ["latin"],
  weight: ['300', '400', '700']
});

export const metadata = {
  title: "PetShow",
  description: "Gerenciador de pet shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={`${latoSans.className}`}>
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
