'use client'

import Link from "next/link";
import styles from "./page.module.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function AtendimentoHome() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/atendimentos`
  const {data: atendimentos, error, isLoading} = useSWR(fetchUrl, fetcher)

  const getAtendimentosPassados = () => Array.from(atendimentos) //copy
          .sort((a, b) => new Date(b.data_marcacao) - new Date(a.marcacao)) //decrescent
          .filter(atend => new Date(atend.data_marcacao) < new Date())

  const getAtendimentosFuturos = () => Array.from(atendimentos)
          .sort((a, b) => new Date(a.data_marcacao) - new Date(b.marcacao)) //crescent
          .filter(atend => new Date(atend.data_marcacao) >= new Date())

  function getHoraFormatada(strData) {
    const data = new Date(strData)
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  if (isLoading) return <h3>Carregando...</h3>
  if (error) return <h3>Algo errado aconteceu: {error.message}</h3>
  
  return (
    <>
      <div className="pageheader">
        <h1>Atendimentos</h1>
        <Link href={`./add`} className="action-button">Adicionar</Link>  
      </div>

      <div className={styles.wrapper}>
        <h2>Atendimentos Futuros</h2>
        { getAtendimentosFuturos().length > 0
          ?
          getAtendimentosFuturos() 
            .map(atendimento =>
              <Link key={atendimento.id} href={`./view/${atendimento.id}`} className="listitem">
                <h3>{atendimento.pet.nome}</h3>
                <p>{getHoraFormatada(atendimento.data_marcacao)}</p>
                <p>{atendimento.funcionario.nome}</p>
              </Link>
          )
          :
          <p className={styles.emptylist}>Não há atendimentos futuros</p>
        }
      </div>

      <div className={styles.wrapper}>
        <h2>Atendimentos Passados</h2>
        { getAtendimentosPassados().length > 0
          ?
          getAtendimentosPassados()
            .map(atendimento =>
              <Link key={atendimento.id} href={`./view/${atendimento.id}`} className="listitem">
                <h3>{atendimento.pet.nome}</h3>
                <p>{getHoraFormatada(atendimento.data_marcacao)}</p>
                <p>{atendimento.funcionario.nome}</p>
              </Link> )
          :
          <p className={styles.emptylist}>Não há atendimentos passados</p>
        }
      </div>
    </>
  );
}