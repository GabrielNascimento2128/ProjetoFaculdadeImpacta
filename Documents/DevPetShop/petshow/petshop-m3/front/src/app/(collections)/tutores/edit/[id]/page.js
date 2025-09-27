"use client"

import { startTransition, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TutorForm from "@/components/tutor-form/tutor-form";

export default function EditPet() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/tutores`

  const {id} = useParams()

  const router = useRouter()

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

  useEffect(() => {
    fetch(`${fetchUrl}/${id}`).then(res => 
      res.json().then(tutor => {
        setTutorData(tutor)
      })
    )
  }, [fetchUrl, id]);

  function editTutor(e, data) {
    e.preventDefault()

    fetch(`${fetchUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      router.push(`/tutores/view/${data.id}` )
      startTransition(router.refresh) // Refreshes data
    })
  }

  return (
    <>
      <h2>Editar Tutor</h2>
      <TutorForm initialData={tutorData} onSubmitHandler={editTutor}/>
    </>
  );
}