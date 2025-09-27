# PetShow
O PetShow é uma plataforma simples para o gerenciamento de Pet Shops.  

## Funcionalidades
Suas principais funcionalidades são:  
- Cadastro de Pets: Registro detalhado de informações sobre os animais. Por exemplo, nome, idade, tamanho, peso, raça e cor da penugem; 
- Cadastro de Tutores: Gerenciamento dos dados dos proprietários dos pets. Por exemplo, nome e endereço. 
- Cadastro de Funcionários: Controle das informações dos colaboradores do pet shop.
- Sistema de Agendamento de Consultas: Funcionalidade para marcar e gerenciar horários de atendimento. Por exemplo, data, horário e o motivo da consulta (aplicação de vacina, por exemplo)

## Arquitetura
O **PetShow** é desenvolvido utilizando uma arquitetura de três camadas, incluindo:
- Front-end: Desenvolvido utilizando **HTML5**, **CSS3** e **Next/React** para uma interface de usuário intuitiva e responsiva.
- Back-end: Implementado em **Python 3.12** utilizando o framework **FastAPI**. Esse framework foi escolhido devido a sua robustez e sua alta performance, comparável com NodeJS e Go. Essa camada é responsável pela lógica de negócios e comunicação com o banco de dados. 
- Banco de Dados: Utilização de um banco de dados **MySQL** devido a natureza dessa ferramenta, ideal para o armazenamento seguro e eficiente de todas as informações do sistema. Essa também é uma ferramenta altamente utilizada em aplicações corporativas. 


