'use client'

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {

  const navRef = useRef();
  const timeoutRef = useRef();

  const [timeoutSignal, setTimeoutSignal] = useState(false); 

  function toggleMenuOpen() {
    navRef.current.classList.toggle("navbar-open");
  }

  function closeMenu() {
    navRef.current.classList.remove("navbar-open");
  }

  // Precisamos disparar um timeout pra o evento blur não cancelar os cliques em links
  function delayedCloseMenu() {
    setTimeoutSignal(!timeoutSignal);
  }

  useEffect(() => {
    timeoutRef.current = setTimeout(closeMenu, 100);

    return () => clearTimeout(timeoutRef.current)
  }, [timeoutSignal])

  return (
    <div className="navbar-container" onBlur={delayedCloseMenu}>
      <div className="navbar-logo-container">
        <Link href="/" className="logo">
          <Image alt="petshow" src={"/petshow.png"} width={24} height={24}/>
          <h1 className="navbar-brand">PetShow</h1>
        </Link>
      </div>

      <button className="navbar-toggler" role="button" onClick={toggleMenuOpen}>
        <Menu />
      </button>

      <nav ref={navRef} className="navbar-links navbar-inner-container">
        <div className="navbar-link" >
          <Link href="/pets/view" onClick={closeMenu}>Pets</Link>
        </div>
        <div className="navbar-link" >
          <Link href="/tutores/view" onClick={closeMenu}>Tutores</Link>
        </div>
        <div className="navbar-link" >
          <Link href="/funcionarios/view" onClick={closeMenu}>Funcionários</Link>
        </div>
      </nav>
    </div>
  );
}