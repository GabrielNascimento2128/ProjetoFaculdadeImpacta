"use client"

import { useState } from "react";

import PetForm from "@/components/pet-form/pet-form";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function AddPet() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/pets`

  const searchParams = useSearchParams()
  const idTutor = searchParams.get("idTutor")

  const [petData, setPetData] = useState({
    raca: '',
    nome: '',
    especie: '',
    sexo: '',
    tamanho: '',
    cor_pelo: '',
    nascimento: '',
    peso: '',
    id_tutor: idTutor ?? ''
  });

  function createPet(e, data) {
    e.preventDefault()

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then(() => {
      setPetData({
        raca: '',
        nome: '',
        especie: '',
        sexo: '',
        tamanho: '',
        cor_pelo: '',
        nascimento: '',
        peso: '',
        id_tutor: idTutor ?? ''
      })

      toast.success('Pet cadastrado', {
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
      <h2>Adicionar Pet</h2>
      <PetForm initialPetData={petData} onSubmitHandler={createPet}/> 
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