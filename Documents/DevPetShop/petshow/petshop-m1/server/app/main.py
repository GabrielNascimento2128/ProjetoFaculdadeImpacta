from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.database import get_db, create_db_and_tables
from app.repositories import PetRepository
from app.schemas import PetPersist
from app.models import Pet

DB_dep = Annotated[Session, Depends(get_db)]

create_db_and_tables()

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=[
                       "http://localhost:3000",
                       "http://127.0.0.1:3000"
                   ],
                   allow_methods=["*"],
                   allow_headers=["Content-Type"])

@app.get("/")
def root():
    return "Olá! Boas vindas a api do PetShow!"


@app.get("/search/pets/{query}")
def search_pet(db: DB_dep, query: str):
    return PetRepository.search(db, query)


@app.get("/pets")
def get_all_pets(db: DB_dep):
    return PetRepository.find_all(db)


@app.post("/pets")
def create_pet(pet: PetPersist, db: DB_dep, response: Response):
    db_pet = Pet(nome=pet.nome, especie=pet.especie, sexo=pet.sexo, raca=pet.raca, nascimento=pet.nascimento,
                 tamanho=pet.tamanho, peso=pet.peso, cor_pelo=pet.cor_pelo)
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)

    response.status_code = HTTP_201_CREATED

    return db_pet


@app.get("/pets/{pet_id}", responses={HTTP_404_NOT_FOUND: {}})
def get_pet_by_id(pet_id: int, db: DB_dep):
    pet_db = PetRepository.find_by_id(db, pet_id)

    if not pet_db:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    return pet_db


@app.put("/pets/{pet_id}",
         responses={HTTP_404_NOT_FOUND: {}})
def update_pet_by_id(pet_id: int, pet: PetPersist, db: DB_dep, response: Response):
    db_pet = db.query(Pet).filter(Pet.id == pet_id).first()

    if not db_pet:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    db_pet.nome = pet.nome
    db_pet.especie = pet.especie
    db_pet.sexo = pet.sexo
    db_pet.raca = pet.raca
    db_pet.nascimento = pet.nascimento
    db_pet.tamanho = pet.tamanho
    db_pet.peso = pet.peso
    db_pet.cor_pelo = pet.cor_pelo

    db.commit()

    return {"status": "Pet atualizado com sucesso"}


@app.delete("/pets/{pet_id}",
            responses={HTTP_404_NOT_FOUND: {}})
def delete_pet_by_id(pet_id: int, db: DB_dep, response: Response):
    pet_db = db.query(Pet).filter(Pet.id == pet_id).first()

    if not pet_db:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    db.delete(pet_db)
    db.commit()

    return {"status", "Pet excluído com sucesso"}

