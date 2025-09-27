"use client"

import { startTransition, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FuncionarioForm from "@/components/funcionario-form/funcionario-form";

export default function EditFuncionario() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/funcionarios`

  const {id} = useParams()

  const router = useRouter()

  const [funcData, setFuncData] = useState({
    nome: '',
    funcao: '',
    genero: '',
    telefone: '',
    email: '',
    endereco_rua: '',
    endereco_numero: '',
    endereco_complemento: '',
    endereco_bairro: '',
    endereco_cidade: ''
  });

  useEffect(() => {
    fetch(`${fetchUrl}/${id}`).then(res => 
      res.json().then(funcionario => {
        setFuncData(funcionario)
      })
    )
  }, [fetchUrl, id]);

  function editFuncionario(e, data) {
    e.preventDefault()

    fetch(`${fetchUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      router.push(`/funcionarios/view/${id}` )
      startTransition(router.refresh) // Refreshes data
    })
  }

  return (
    <>
      <h2>Editar Funcionário</h2>
      <FuncionarioForm initialData={funcData} onSubmitHandler={editFuncionario}/>
    </>
  );
}