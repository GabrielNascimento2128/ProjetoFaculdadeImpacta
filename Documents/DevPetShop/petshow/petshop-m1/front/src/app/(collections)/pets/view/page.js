'use client'

import Link from "next/link";
import styles from "./page.module.css";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function PetHome() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/pets`

  const [termoBusca, setTermoBusca] = useState("");
  const [petFiltrados, setPetFiltrados] = useState([]);

  const {data: pets, error, isLoading} = useSWR(fetchUrl, fetcher)

  function filtraResultados(termo) {
    setTermoBusca(termo);
  }

  useEffect(() => {
    if (termoBusca !== "") {
      setPetFiltrados(pets?.filter(pet => pet.nome.match(new RegExp(`^${termoBusca}`, "i"))))
    } else {
      setPetFiltrados(pets)
    }
  }, [termoBusca, pets])

  if (isLoading) return <h3>Carregando...</h3>
  if (error) return <h3>Algo errado aconteceu: {error.message}</h3>

  return (
    <>
      <div className={styles.header}>
        <h1>Pets</h1>
        <Link href={`./add`} className="action-button">Adicionar</Link>  
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Filtrar por nome"
          value={termoBusca}
          onChange={e => filtraResultados(e.target.value)}
          className="searchbox" />
      </div>
      <div className={styles.wrapper}>
        { petFiltrados?.map(pet =>
        <Link key={pet.id} href={`./view/${pet.id}`} className="listitem">
          <h2>{pet.nome}</h2>
          <p>{pet.especie}</p>
        </Link>
        )}
      </div>
    </>
  );
}