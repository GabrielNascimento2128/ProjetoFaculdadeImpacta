import styles from "./pet-form.module.css"

import { useEffect, useState } from "react";

export default function PetForm({initialPetData, onSubmitHandler}) {

  const [petData, setPetData] = useState(initialPetData);

  useEffect(() => {
    setPetData(initialPetData)
  }, [initialPetData]);

  return(
    <form className={styles.form} onSubmit={(e) => onSubmitHandler(e, petData)}>
        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="nome" >Nome</label>
          <input 
              className={styles.inputcontrol} 
              type="text" 
              name="nome" 
              value={petData.nome} 
              onChange={(e) => setPetData({...petData, nome: e.target.value})}
              required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="especie">Espécie</label>
          <input 
              className={styles.inputcontrol} 
              type="text" 
              name="especie"
              value={petData.especie}
              onChange={(e) => setPetData({...petData, especie: e.target.value})} 
              required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="sexo">Sexo</label>
          <select 
              className={styles.inputcontrol}
              type="text"
              name="sexo"
              value={petData.sexo}
              onChange={(e) => setPetData({...petData, sexo: e.target.value})}
              required>
            <option value="">Selecione</option>
            <option value="F">Fêmea</option>
            <option value="M">Macho</option>
          </select>
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="raca">Raça</label>
          <input 
              className={styles.inputcontrol}
              type="text"
              name="raca"
              value={petData.raca}
              onChange={(e) => setPetData({...petData, raca: e.target.value})}
              required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="cor_pelo">Cor de Pelo/Pluma</label>
          <input 
              className={styles.inputcontrol}
              type="text"
              name="cor_pelo"
              value={petData.cor_pelo}
              onChange={(e) => setPetData({...petData, cor_pelo: e.target.value})}
              required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="tamanho">Tamanho (cm)</label>
          <input 
              className={styles.inputcontrol}
              type="number"
              name="tamanho"
              value={petData.tamanho}
              onChange={(e) => setPetData({...petData, tamanho: e.target.value})}
              required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="peso">Peso (g)</label>
          <input 
            className={styles.inputcontrol}
            type="number"
            name="peso"
            value={petData.peso}
            onChange={(e) => setPetData({...petData, peso: e.target.value})}
            required
            />
        </div>

        <div className={styles.inputgroup}>
          <label className={styles.inputlabel} htmlFor="nascimento">Nascimento</label>
          <input 
            className={styles.inputcontrol}
            type="date"
            name="nascimento"
            value={petData.nascimento}
            onChange={(e) => setPetData({...petData, nascimento: e.target.value})}
            required
            />
        </div>
        
        <button className="action-button">Salvar</button>
      </form>
  );
}