import styles from "./atendimento-edit-form.module.css"

import { useEffect, useState } from "react";

export default function AtendimentoEditForm({initialData, onSubmitHandler}) {

  function getValorEmCentavos(valor) {
    return Math.floor(Number.parseFloat(valor !== '' ? valor : 0) * 100);
  }

  function getValorEmReais(valor) {
    return Math.round(valor / 100, 2)
  }

  const [atendData, setAtendData] = useState(initialData);

  useEffect(() => {
    setAtendData(initialData)
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
            value={atendData.pet?.id_tutor ?? ''} 
            disabled
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="nome_pet">Pet</label>
        <input 
            className="inputcontrol" 
            type="text"
            id="nome_pet" 
            name="nome_pet" 
            value={atendData.pet?.nome ?? ''}
            disabled />
      </div>

      <input 
        className="inputcontrol" 
        type="text"
        id="id_pet" 
        name="id_pet" 
        value={atendData.id_pet}
        hidden
        readOnly />

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