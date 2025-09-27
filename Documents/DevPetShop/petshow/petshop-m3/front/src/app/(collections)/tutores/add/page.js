"use client"

import { useState } from "react";

import TutorForm from "@/components/tutor-form/tutor-form";
import { toast, ToastContainer, Zoom } from "react-toastify";

export default function AddTutor() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/tutores`

  const [tutorData, setTutorData] = useState({
    id: '',
    nome: '',
    genero: '',
    telefone: '',
    email: '',
    endereco_rua: '',
    endereco_numero: '',
    endereco_complemento: '',
    endereco_bairro: '',
    endereco_cidade: ''
  });

  function createTutor(e, data) {
    e.preventDefault()

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
      
    }).then(() => {
      setTutorData({
        id: '',
        nome: '',
        genero: '',
        telefone: '',
        email: '',
        endereco_rua: '',
        endereco_numero: '',
        endereco_complemento: '',
        endereco_bairro: '',
        endereco_cidade: ''
      })

      toast.success('Tutor cadastrado', {
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
      <h2>Adicionar Tutor</h2>
      <TutorForm initialData={tutorData} onSubmitHandler={createTutor}/>
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