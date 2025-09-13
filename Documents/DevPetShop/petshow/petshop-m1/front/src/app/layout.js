import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PetShow",
  description: "Gerenciador de pet shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="navbar-main">
          <Link href="/" className="logo">
            <Image alt="petshow" src={"/petshow.png"} width={24} height={24}/>
            <h1>PetShow</h1>
          </Link>
          <ul className="navbar-links">
            <li>
              <Link href="/pets/view">Pets</Link>
            </li>
          </ul>
        </nav>
        <Suspense>
          <main className="main-content">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
