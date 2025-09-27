import { useEffect, useState } from "react";

export default function PetForm({initialPetData, onSubmitHandler}) {

  const [petData, setPetData] = useState(initialPetData);

  useEffect(() => {
    setPetData(initialPetData)
  }, [initialPetData]);

  return(
    <form className="form" onSubmit={(e) => onSubmitHandler(e, petData)}>
        <div className="inputgroup">
          <label className="inputlabel" htmlFor="nome" >Nome</label>
          <input 
              className="inputcontrol" 
              type="text" 
              id="nome" 
              name="nome" 
              value={petData.nome} 
              onChange={(e) => setPetData({...petData, nome: e.target.value})}
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="id_tutor">ID do Tutor</label>
          <input 
              className="inputcontrol" 
              type="number" 
              id="id_tutor" 
              name="id_tutor" 
              value={petData.id_tutor}
              onChange={(e) => setPetData({...petData, id_tutor: e.target.value})}
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="especie">Espécie</label>
          <input 
              className="inputcontrol" 
              type="text" 
              id="especie"
              name="especie"
              value={petData.especie}
              onChange={(e) => setPetData({...petData, especie: e.target.value})} 
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="sexo">Sexo</label>
          <select 
              className="inputcontrol"
              name="sexo"
              value={petData.sexo}
              onChange={(e) => setPetData({...petData, sexo: e.target.value})}
              required>
            <option value="">Selecione</option>
            <option value="F">Fêmea</option>
            <option value="M">Macho</option>
          </select>
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="raca">Raça</label>
          <input 
              className="inputcontrol"
              type="text"
              id="raca"
              name="raca"
              value={petData.raca}
              onChange={(e) => setPetData({...petData, raca: e.target.value})}
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="cor_pelo">Cor de Pelo/Pluma</label>
          <input 
              className="inputcontrol"
              type="text"
              id="cor_pelo"
              name="cor_pelo"
              value={petData.cor_pelo}
              onChange={(e) => setPetData({...petData, cor_pelo: e.target.value})}
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="tamanho">Tamanho (cm)</label>
          <input 
              className="inputcontrol"
              type="number"
              id="tamanho"
              name="tamanho"
              value={petData.tamanho}
              onChange={(e) => setPetData({...petData, tamanho: e.target.value})}
              required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="peso">Peso (g)</label>
          <input 
            className="inputcontrol"
            type="number"
            id="peso"
            name="peso"
            value={petData.peso}
            onChange={(e) => setPetData({...petData, peso: e.target.value})}
            required
            />
        </div>

        <div className="inputgroup">
          <label className="inputlabel" htmlFor="nascimento">Nascimento</label>
          <input 
            className="inputcontrol"
            type="date"
            id="nascimento"
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