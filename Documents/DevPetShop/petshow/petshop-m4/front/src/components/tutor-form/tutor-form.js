import { useEffect, useState } from "react";

export default function TutorForm({initialData, onSubmitHandler}) {
  
  const [tutorData, setTutorData] = useState(initialData);

  useEffect(() => {
    setTutorData(initialData)
  }, [initialData]);
  
  return (
    <form className="form" onSubmit={(e) => onSubmitHandler(e, tutorData)}>
      <div className="inputgroup">
        <label className="inputlabel" htmlFor="id" >Id</label>
        <input 
            className="inputcontrol" 
            type="text" 
            id="id" 
            name="id" 
            value={tutorData.id} 
            onChange={(e) => setTutorData({...tutorData, id: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="nome" >Nome</label>
        <input 
            className="inputcontrol" 
            type="text" 
            id="nome" 
            name="nome" 
            value={tutorData.nome} 
            onChange={(e) => setTutorData({...tutorData, nome: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="genero">Gênero</label>
        <select 
            className="inputcontrol" 
            id="genero"
            name="genero"
            value={tutorData.genero}
            onChange={(e) => setTutorData({...tutorData, genero: e.target.value})}
            required>
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="telefone">Telefone</label>
        <input 
            className="inputcontrol" 
            type="tel" 
            id="telefone"
            name="telefone"
            value={tutorData.telefone}
            onChange={(e) => setTutorData({...tutorData, telefone: e.target.value})} 
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="email">Email</label>
        <input 
            className="inputcontrol"
            type="email"
            id="email"
            name="email"
            value={tutorData.email}
            onChange={(e) => setTutorData({...tutorData, email: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_rua">Rua</label>
        <input 
            className="inputcontrol"
            type="text"
            id="endereco_rua"
            name="endereco_rua"
            value={tutorData.endereco_rua}
            onChange={(e) => setTutorData({...tutorData, endereco_rua: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_numero">Número</label>
        <input 
            className="inputcontrol"
            type="text"
            id="endereco_numero"
            name="endereco_numero"
            value={tutorData.endereco_numero}
            onChange={(e) => setTutorData({...tutorData, endereco_numero: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_complemento">Complemento</label>
        <input 
            className="inputcontrol"
            type="text"
            id="endereco_complemento"
            name="endereco_complemento"
            value={tutorData.endereco_complemento}
            onChange={(e) => setTutorData({...tutorData, endereco_complemento: e.target.value})}
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_bairro">Bairro</label>
        <input 
            className="inputcontrol"
            type="text"
            id="endereco_bairro"
            name="endereco_bairro"
            value={tutorData.endereco_bairro}
            onChange={(e) => setTutorData({...tutorData, endereco_bairro: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_cidade">Cidade</label>
        <input 
            className="inputcontrol"
            type="text"
            id="endereco_cidade"
            name="endereco_cidade"
            value={tutorData.endereco_cidade}
            onChange={(e) => setTutorData({...tutorData, endereco_cidade: e.target.value})}
            required
          />
      </div>
      
      <button className="action-button">Salvar</button>
    </form>
  );
}