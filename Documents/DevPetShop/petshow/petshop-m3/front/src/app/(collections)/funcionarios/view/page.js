'use client'

import Link from "next/link";
import styles from "./page.module.css";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function FuncionarioHome() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/funcionarios`

  const [termoBusca, setTermoBusca] = useState("");
  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);

  const {data: funcionarios, error, isLoading} = useSWR(fetchUrl, fetcher)

  function filtraResultados(termo) {
    setTermoBusca(termo);
  }

  useEffect(() => {
    if (termoBusca !== "") {
      setFuncionariosFiltrados(funcionarios?.filter(funci => funci.nome.match(new RegExp(`^${termoBusca}`, "i"))))
    } else {
      setFuncionariosFiltrados(funcionarios)
    }
  }, [termoBusca, funcionarios])
  
  if (isLoading) return <h3>Carregando...</h3>
  if (error) return <h3>Algo errado aconteceu: {error.message}</h3>

  return (
    <>
      <div className="pageheader">
        <h1>Funcionários</h1>
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
        { funcionariosFiltrados?.map(funcionario =>
        <Link key={funcionario.id} href={`./view/${funcionario.id}`} className="listitem">
          <h2>{funcionario.nome}</h2>
          <p>{funcionario.funcao}</p>
        </Link>
        )}
      </div>
    </>
  );
}