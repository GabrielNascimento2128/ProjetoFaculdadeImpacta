"use client"

import { useState } from "react";

import AtendimentoAddForm from "@/components/atendimento-add-form/atendimento-add-form";
import { toast, ToastContainer, Zoom } from "react-toastify";

export default function AddAtendimento() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/atendimentos`

  const [atendData, setAtendData] = useState({
    id_pet: '',
    id_funcionario: '',
    data_marcacao: '',
    valor_centavos: '',
    descricao: ''
  });

  function createAtendimento(e, data) {
    e.preventDefault()

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if(res.status !== 201) {
        throw new Error();
      }

      setAtendData({
        id_pet: '',
        id_funcionario: '',
        data_marcacao: '',
        valor_centavos: '',
        descricao: ''
      })

      toast.success('Atendimento cadastrado', {
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
      <h2>Adicionar Atendimento</h2>
      <AtendimentoAddForm initialData={atendData} onSubmitHandler={createAtendimento}/>
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