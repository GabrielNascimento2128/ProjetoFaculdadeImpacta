import styles from './page.module.css'

import EntityActions from "@/components/entity-actions/entity-actions"

export default async function AtendimentoDetails({params}) {
  const {id} = await params
  const atendFetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/atendimentos/${id}`
  const data = await fetch(atendFetchUrl)
  const atendimento = await data.json()

  function getDataHoraFormatada(strData) {
    const data = new Date(strData)
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  function getValorFormatadoParaReais(valor) {
    return Number.parseFloat(valor / 100).toFixed(2)
  }

  return (
    <div className={styles.container}>
      <div className="pageheader">
        <h1 className={styles.heading}>{atendimento.pet.nome}</h1>
        <EntityActions entityUrl="atendimentos" entityId={id}/>
      </div>
      <div className={styles.body}>
        <h2>Atendimento</h2>
        <p><span className={styles.bold}>Horário: </span>{getDataHoraFormatada(atendimento.data_marcacao)}</p>
        <p><span className={styles.bold}>Funcionário: </span>{atendimento.funcionario.nome}</p>
        <p><span className={styles.bold}>Valor: </span>{`R\$ ${getValorFormatadoParaReais(atendimento.valor_centavos)}`}</p>
        <p><span className={styles.bold}>Descrição: </span>{atendimento.descricao}</p>
      </div>
    </div>
  );
}