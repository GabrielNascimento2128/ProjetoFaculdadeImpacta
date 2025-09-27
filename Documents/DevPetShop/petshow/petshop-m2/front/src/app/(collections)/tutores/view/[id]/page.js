import Link from "next/link"
import styles from './page.module.css'

import EntityActions from "@/components/entity-actions/entity-actions"

export default async function TutorDetails({params}) {
  const {id} = await params
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/tutores/${id}`
  const data = await fetch(fetchUrl)
  const tutor = await data.json()

  function getFormattedAddress(tutor) {
    return `${tutor.endereco_rua}, ${tutor.endereco_numero}` 
      + `${tutor.endereco_complemento === "" ? "" : (", " + tutor.endereco_complemento)}, `
      + `${tutor.endereco_bairro}, ${tutor.endereco_cidade}`
  }

  const petsList = (
    <ul className={styles.petslist}>
      {tutor.pets.map(pet =>
        <li key={pet.id}>
          <Link href={`/pets/view/${pet.id}`} className="listitem">
            <h3>{pet.nome}</h3>
            <p>{pet.especie}</p>
          </Link>
        </li>)
      }
    </ul>
  );


  return (
    <div className={styles.container}>
      <div className="pageheader">
        <h1 className={styles.heading}>{tutor.nome}</h1>
        <EntityActions entityUrl="tutores" entityId={id}/>
      </div>
      <div className={styles.body}>
        <p><span className={styles.bold}>Identificação: </span>{tutor.id}</p>
        <p><span className={styles.bold}>Gênero: </span>{tutor.genero}</p>
        <p><span className={styles.bold}>Telefone: </span>{tutor.telefone}</p>
        <p><span className={styles.bold}>Email: </span>{tutor.email}</p>
        <p><span className={styles.bold}>Endereco: </span>{getFormattedAddress(tutor)}</p>
      </div>
      <div className={styles.container}>
        <div className="pageheader">
          <h2>Pets</h2>
          <Link href={`/pets/add?idTutor=${id}`} className="action-button">
            Adicionar
          </Link>
        </div>
        { 
          (tutor.pets.length > 0) ? 
          petsList : 
          <p>O tutor não possui pets cadastrados</p>
        }
      </div>
    </div>
  );
}