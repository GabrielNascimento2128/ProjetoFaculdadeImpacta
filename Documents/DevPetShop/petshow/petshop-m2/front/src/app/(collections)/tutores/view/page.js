'use client'

import Link from "next/link";
import styles from "./page.module.css";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function TutorHome() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/tutores`

  const [termoBusca, setTermoBusca] = useState("");
  const [tutoresFiltrados, setTutoresFiltrados] = useState([]);

  const {data: tutores, error, isLoading} = useSWR(fetchUrl, fetcher);

  function filtraResultados(termo) {
    setTermoBusca(termo);
  }

  useEffect(() => {
    if (termoBusca !== "") {
      setTutoresFiltrados(tutores?.filter(tutor => tutor.id.match(new RegExp(`^${termoBusca}`, "i"))))
    } else {
      setTutoresFiltrados(tutores)
    }
  }, [termoBusca, tutores])
  
  if (isLoading) return <h3>Carregando...</h3>
  if (error) return <h3>Algo errado aconteceu: {error.message}</h3>

  return (
    <>
      <div className="pageheader">
        <h1>Tutores</h1>
        <Link href={`./add`} className="action-button">Adicionar</Link>  
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Filtrar por ID"
          value={termoBusca}
          onChange={e => filtraResultados(e.target.value)}
          className="searchbox" />
      </div>
      <div className={styles.wrapper}>
        { tutoresFiltrados?.map(tutor =>
        <Link key={tutor.id} href={`./view/${tutor.id}`} className="listitem">
          <h2>{tutor.nome}</h2>
          <p>{tutor.id}</p>
        </Link>
        )}
      </div>
    </>
  );
}