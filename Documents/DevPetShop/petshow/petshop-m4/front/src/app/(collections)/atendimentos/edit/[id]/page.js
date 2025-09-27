"use client"

import { startTransition, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AtendimentoEditForm from "@/components/atendimento-edit-form/atendimento-edit-form";

export default function EditAtendimento() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/atendimentos`

  const {id} = useParams()

  const router = useRouter()

  const [atendData, setAtendData] = useState({
    id_tutor: '',
    nome_pet: '',
    id_pet: '',
    id_funcionario: '',
    data_marcacao: '',
    valor_centavos: '',
    descricao: ''
  });

  useEffect(() => {
    fetch(`${fetchUrl}/${id}`).then(res => 
      res.json().then(atendimento => 
        setAtendData({
          id_tutor: atendimento.pet.id_tutor, 
          nome_pet: atendimento.pet.nome, 
          ...atendimento
        })
      )
    )
  }, [fetchUrl, id]);

  function editAtendimento(e, data) {
    e.preventDefault()

    fetch(`${fetchUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      router.push(`/atendimentos/view/${id}` )
      startTransition(router.refresh) // Refreshes data
    })
  }

  return (
    <>
      <h2>Editar Atendimento</h2>
      <AtendimentoEditForm initialData={atendData} onSubmitHandler={editAtendimento}/>
    </>
  );
}