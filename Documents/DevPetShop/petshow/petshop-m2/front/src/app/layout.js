import { Lato } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
        <nav className="navbar-main">
          <Link href="/" className="logo">
            <Image alt="petshow" src={"/petshow.png"} width={24} height={24}/>
            <h1>PetShow</h1>
          </Link>
          <ul className="navbar-links">
            <li>
              <Link className="navbar-link" href="/pets/view">Pets</Link>
            </li>
            <li>
              <Link className="navbar-link" href="/tutores/view">Tutores</Link>
            </li>
          </ul>
        </nav>
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
