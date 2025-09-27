import { useDebouncedCallback } from "use-debounce";
import styles from "./atendimento-add-form.module.css"

import { useEffect, useState } from "react";

export default function AtendimentoAddForm({initialData, onSubmitHandler}) {

  function getValorEmCentavos(valor) {
    return Math.floor(Number.parseFloat(valor !== '' ? valor : 0) * 100);
  }

  function getValorEmReais(valor) {
    return Math.round(valor / 100, 2)
  }

  const setIdTutorBuscaDebounced = useDebouncedCallback((idTutor) => setIdTutorBusca(idTutor), 2000);
  
  function alteraIdTutor(idTutor) {
    setIdTutorDisplay(idTutor);
    setIdTutorBuscaDebounced(idTutor);
  }

  const [atendData, setAtendData] = useState(initialData);
  const [idTutorDisplay, setIdTutorDisplay] = useState("");
  const [idTutorBusca, setIdTutorBusca] = useState(idTutorDisplay);
  const [infoPetsTutor, setInfoPetsTutor] = useState([]);

  useEffect(() => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/pets?id_tutor=${idTutorBusca}`;

    fetch(fetchUrl).then(data => 
      data.json().then(infoPets => {
        setInfoPetsTutor(infoPets)
      })
    ).finally()

  }, [idTutorBusca])

  useEffect(() => {
    setAtendData(initialData)
    setIdTutorDisplay("")
  }, [initialData]);
  
  return (
    <form className="form" onSubmit={(e) => onSubmitHandler(e, atendData)}>
      <div className="inputgroup">
        <label className="inputlabel" htmlFor="id_tutor">ID do Tutor</label>
        <input 
            className="inputcontrol" 
            type="text" 
            id="id_tutor" 
            name="id_tutor" 
            value={idTutorDisplay} 
            onChange={(e) => alteraIdTutor(e.target.value)}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="id_pet">Pet</label>
        <select 
            className="inputcontrol" 
            id="id_pet" 
            name="id_pet" 
            value={atendData.id_pet} 
            onChange={(e) => setAtendData({...atendData, id_pet: e.target.value})}
            required>
            <option value="">Selecione</option>
            { infoPetsTutor.map(pet => 
              <option key={pet.id} value={pet.id}>{pet.nome}</option>
            )}
          </select>
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="id_funcionario" >ID do Funcionário</label>
        <input 
            className="inputcontrol" 
            type="text" 
            id="id_funcionario" 
            name="id_funcionario" 
            value={atendData.id_funcionario} 
            onChange={(e) => setAtendData({...atendData, id_funcionario: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="data_marcacao">Data Marcada</label>
        <input 
            className="inputcontrol" 
            type="datetime-local"
            id="data_marcacao"
            name="data_marcacao"
            value={atendData.data_marcacao}
            onChange={(e) => setAtendData({...atendData, data_marcacao: e.target.value})}
            required />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="valor_reais">Valor (R$)</label>
        <input 
            className="inputcontrol" 
            type="number" 
            id="valor_reais"
            name="valor_reais"
            min="0"
            value={atendData.valor_centavos !== '' ? getValorEmReais(atendData.valor_centavos) : ''}
            onChange={(e) => setAtendData({...atendData, valor_centavos: getValorEmCentavos(e.target.value)})} 
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="descricao">Descrição</label>
        <textarea 
            className={`inputcontrol ${styles.textarea}`}
            type="text"
            id="descricao"
            name="descricao"
            value={atendData.descricao}
            onChange={(e) => setAtendData({...atendData, descricao: e.target.value})}
            rows={5}
            required
          />
      </div>

      <button className="action-button">Salvar</button>
    </form>
  );
}