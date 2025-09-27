import styles from './page.module.css'

import EntityActions from "@/components/entity-actions/entity-actions"

export default async function FuncionarioDetails({params}) {
  const {id} = await params
  const funcFetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/funcionarios/${id}`
  const data = await fetch(funcFetchUrl)
  const funcionario = await data.json()

  function getFormattedAddress(funcionario) {
    return `${funcionario.endereco_rua}, ${funcionario.endereco_numero}` 
      + `${funcionario.endereco_complemento === "" ? "" : (", " + funcionario.endereco_complemento)}, `
      + `${funcionario.endereco_bairro}, ${funcionario.endereco_cidade}`
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.heading}>{funcionario.nome}</h1>
        <EntityActions entityUrl="funcionarios" entityId={id}/>
      </div>
      <div className={styles.body}>
        <h2><span className={styles.bold}></span>{funcionario.funcao}</h2>
        <p><span className={styles.bold}>Gênero: </span>{funcionario.genero}</p>
        <p><span className={styles.bold}>Telefone: </span>{funcionario.telefone}</p>
        <p><span className={styles.bold}>Email: </span>{funcionario.email}</p>
        <p><span className={styles.bold}>Endereco: </span>{getFormattedAddress(funcionario)}</p>
      </div>
    </div>
  );
}