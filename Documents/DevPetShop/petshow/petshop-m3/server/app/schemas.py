from typing import Optional

from pydantic import BaseModel
from datetime import date

class PetPersist(BaseModel):
    nome: str
    especie: str
    sexo: str
    raca: str
    nascimento: date
    tamanho: Optional[int] = None
    peso: Optional[int] = None
    cor_pelo: str
    id_tutor: str


class TutorPersist(BaseModel):
    id: str
    nome: str
    genero: str
    telefone: str
    email: str
    endereco_rua: str
    endereco_numero: str
    endereco_complemento: str
    endereco_bairro: str
    endereco_cidade: str


class FuncionarioPersist(BaseModel):
    nome: str
    funcao: str
    genero: str
    telefone: str
    email: str
    endereco_rua: str
    endereco_numero: str
    endereco_complemento: str
    endereco_bairro: str
    endereco_cidade: str
