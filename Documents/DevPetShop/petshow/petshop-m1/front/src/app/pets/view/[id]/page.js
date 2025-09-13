'use client'

import { useParams } from "next/navigation"
import styles from './page.module.css'

import PetActions from "@/components/pet-actions/pet-actions"
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function PetDetails() {
  const {id} = useParams();
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/pets/${id}`

  const {data: pet, error, isLoading} = useSWR(fetchUrl, fetcher)

  const getFormattedDate = function (strDate) {
    const date = new Date(strDate)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
  }

  const getAge = function (strBirthdate) {
    const birthdate = new Date(strBirthdate)
    const today = new Date()
    const elapsedMs = today - birthdate
    const elapsedInYears = elapsedMs / (1000 * 60 * 60 * 24 * 365);

    return Math.floor(elapsedInYears)
  }

  if (isLoading) return <h3>Carregando...</h3>
  if (error) return <h3>Algo errado aconteceu: {error.message}</h3>

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{pet.nome}</h1>
          <PetActions petId={id}/>
        </div>
        <div className={styles.body}>
          <h2>{pet.especie}</h2>
          <p><span className={styles.bold}>Sexo: </span>{pet.sexo}</p>
          <p><span className={styles.bold}>Raça: </span>{pet.raca}</p>
          <p><span className={styles.bold}>Nascimento: </span>{ getFormattedDate(pet.nascimento)}</p>
          <p><span className={styles.bold}>Idade: </span>{getAge(pet.nascimento)} anos completos</p>
          <p><span className={styles.bold}>Cor de Pelo/Pluma: </span>{pet.cor_pelo}</p>
          <p><span className={styles.bold}>Peso: </span>{pet.peso} g</p>
          <p><span className={styles.bold}>Tamanho: </span>{pet.tamanho} cm</p>
        </div>
      </div>
      
    </>
  );
}