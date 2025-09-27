"use client"

import { startTransition, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PetForm from "@/components/pet-form/pet-form";

export default function EditPet() {
  const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/pets`

  const {id} = useParams()

  const router = useRouter()

  const [petData, setPetData] = useState({
    raca: '',
    nome: '',
    sexo: '',
    especie: '',
    tamanho: '',
    cor_pelo: '',
    nascimento: '',
    peso: ''
  });

  useEffect(() => {
    fetch(`${fetchUrl}/${id}`).then(res => 
      res.json().then(pet => {
        setPetData(pet)
      })
    )
  }, [fetchUrl, id]);

  function editPet(e, data) {
    e.preventDefault()

    fetch(`${fetchUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      router.push(`/pets/view/${id}`)
      startTransition(router.refresh) // Refreshes data
    })
  }

  return (
    <>
      <h2>Editar Pet</h2>
      <PetForm initialPetData={petData} onSubmitHandler={editPet}/>
    </>
  );
}