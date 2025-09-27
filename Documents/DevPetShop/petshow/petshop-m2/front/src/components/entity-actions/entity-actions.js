'use client'

import { startTransition } from "react";
import styles from "./entity-actions.module.css"

import { useRouter } from "next/navigation";

export default function EntityActions({entityUrl, entityId}) {
  const router = useRouter()

  function navigateToEdit() {
    router.push(`/${entityUrl}/edit/${entityId}`)
  }

  function deletePet() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${entityUrl}/${entityId}`, {
            "method": "DELETE"
    }).then(() => {
      router.push(`/${entityUrl}/view`)
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