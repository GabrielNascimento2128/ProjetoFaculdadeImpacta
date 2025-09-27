# PetShow Server
O servidor do PetShow, desenvolvido em FastAPI.

A API pode ser acessada em http://localhost:8080 e a documentação, gerada pelo **Swagger UI**, encontra-se disponível em http://localhost:8000/docs

## Instruções de instalação (Windows Powershell)
### Requisitos
- Python 3.12
- pip: gerenciador de dependências de Python 3
- MySQL instalado, configurado e executando

### Passo a passo
- Verifique se possui o `Python 3.12` e o `pip` instalados em sua máquina e disponíveis no `PATH`. Caso não tenha 
  instale-os.
- Dentro desta pasta `server`, crie um ambiente virtual para a execução utilizando `python -m venv <nome_do_ambiente>`
- Ative seu ambiente virtual utilizando `.\<nome_do_ambiente>\Scripts\activate.ps1`
- Com o ambiente virtual ativo, utilize o comando `pip install -r requirements.txt` para instalar todas as 
  dependências

### Passo a passo (Banco de Dados)
- Com o `MySQL` instalado e configurado, acesse o console e execute os seguintes comandos para criar um usuário e um 
  banco de dados para o petshow e garantir o acesso do novo usuário ao banco de dados criado:  
  `CREATE USER 'petshow'@'localhost' IDENTIFIED BY 'petshow123';`  
  `CREATE DATABASE petshow;`  
  `GRANT ALL PRIVILEGES ON petshow.* TO 'petshow'@'localhost';`

## Instruções de execução (Windows Powershell)
Para executar o servidor, **ative o ambiente virtual** e utilize `fastapi run main.py`
