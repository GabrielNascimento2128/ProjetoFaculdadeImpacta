from typing import Optional

from pydantic import BaseModel
from datetime import date

class PetPersist(BaseModel):
    nome: str
    especie: str #TODO String ou enum?
    sexo: str
    raca: str
    nascimento: date
    tamanho: Optional[int]
    peso: Optional[int]
    cor_pelo: str