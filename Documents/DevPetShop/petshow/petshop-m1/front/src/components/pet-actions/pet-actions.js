'use client'

import { startTransition } from "react";
import styles from "./pet-actions.module.css"

import { useRouter } from "next/navigation";

export default function PetActions({petId}) {
  const router = useRouter()

  function navigateToEdit() {
    router.push(`/pets/edit/${petId}`)
  }

  function deletePet() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/pets/${petId}`, {
            "method": "DELETE"
    }).then(() => {
      router.push(`/pets/view`)
      startTransition(router.refresh) // Refreshes data
    })
  }

  return (
    <div className={styles.buttons}>
      <button className="action-button" 
              onClick={navigateToEdit}>
        Editar
      </button>
      <button className="action-button destructive-button"
              onClick={deletePet}>
        Apagar
      </button>
    </div>
  );
}