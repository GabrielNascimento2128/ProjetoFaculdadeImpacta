import { useEffect, useState } from "react";

export default function FuncionarioForm({initialData, onSubmitHandler}) {

  const [funcData, setFuncData] = useState(initialData);

  useEffect(() => {
    setFuncData(initialData)
  }, [initialData]);

  return (
    <form className="form" onSubmit={(e) => onSubmitHandler(e, funcData)}>
      <div className="inputgroup">
        <label className="inputlabel" htmlFor="nome" >Nome</label>
        <input 
            className="inputcontrol" 
            type="text" 
            name="nome" 
            value={funcData.nome} 
            onChange={(e) => setFuncData({...funcData, nome: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="funcao" >Função</label>
        <input 
            className="inputcontrol" 
            type="text" 
            name="funcao" 
            value={funcData.funcao} 
            onChange={(e) => setFuncData({...funcData, funcao: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="genero">Gênero</label>
        <select 
            className="inputcontrol" 
            name="genero"
            value={funcData.genero}
            onChange={(e) => setFuncData({...funcData, genero: e.target.value})}
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
            name="telefone"
            value={funcData.telefone}
            onChange={(e) => setFuncData({...funcData, telefone: e.target.value})} 
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="email">Email</label>
        <input 
            className="inputcontrol"
            type="email"
            name="email"
            value={funcData.email}
            onChange={(e) => setFuncData({...funcData, email: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_rua">Rua</label>
        <input 
            className="inputcontrol"
            type="text"
            name="endereco_rua"
            value={funcData.endereco_rua}
            onChange={(e) => setFuncData({...funcData, endereco_rua: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_numero">Número</label>
        <input 
            className="inputcontrol"
            type="text"
            name="endereco_numero"
            value={funcData.endereco_numero}
            onChange={(e) => setFuncData({...funcData, endereco_numero: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_complemento">Complemento</label>
        <input 
            className="inputcontrol"
            type="text"
            name="endereco_complemento"
            value={funcData.endereco_complemento}
            onChange={(e) => setFuncData({...funcData, endereco_complemento: e.target.value})}
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_bairro">Bairro</label>
        <input 
            className="inputcontrol"
            type="text"
            name="endereco_bairro"
            value={funcData.endereco_bairro}
            onChange={(e) => setFuncData({...funcData, endereco_bairro: e.target.value})}
            required
          />
      </div>

      <div className="inputgroup">
        <label className="inputlabel" htmlFor="endereco_cidade">Cidade</label>
        <input 
            className="inputcontrol"
            type="text"
            name="endereco_cidade"
            value={funcData.endereco_cidade}
            onChange={(e) => setFuncData({...funcData, endereco_cidade: e.target.value})}
            required
          />
      </div>
      
      <button className="action-button">Salvar</button>
    </form>
  );
}