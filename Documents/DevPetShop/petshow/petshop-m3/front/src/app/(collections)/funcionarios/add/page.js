"use client"

import { useState } from "react";

import FuncionarioForm from "@/components/funcionario-form/funcionario-form";
import { toast, ToastContainer, Zoom } from "react-toastify";

export default function AddFuncionario() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/funcionarios`

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

  function createFuncionario(e, data) {
    e.preventDefault()

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      setFuncData({
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
      })

      toast.success('Funcionário cadastrado', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      })
    }).catch(e =>
      toast.error(`Algo errado aconteceu`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        })
      );
  }

  return (
    <>
      <h2>Adicionar Funcionário</h2>
      <FuncionarioForm initialData={funcData} onSubmitHandler={createFuncionario}/>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </>
  );
}