from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.database import get_db, create_db_and_tables
from app.repositories import PetRepository, TutorRepository
from app.schemas import PetPersist, TutorPersist
from app.models import Pet, Tutor

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


# BUSCAS
@app.get("/search/pets/{query}")
def search_pet(db: DB_dep, query: str):
    return PetRepository.search(db, query)


@app.get("/search/tutores/{query}")
def search_pet(db: DB_dep, query: str):
    return TutorRepository.search(db, query)


# TUTORES
@app.get("/tutores")
def listar_tutores(db: DB_dep):
    return TutorRepository.find_all(db)


@app.post("/tutores")
def adicionar_tutor(tutor: TutorPersist, db: DB_dep, response: Response):
    db_tutor = Tutor(id=tutor.id,
                     nome=tutor.nome,
                     genero=tutor.genero,
                     telefone=tutor.telefone,
                     email=tutor.email,
                     endereco_rua=tutor.endereco_rua,
                     endereco_numero=tutor.endereco_numero,
                     endereco_complemento=tutor.endereco_complemento,
                     endereco_bairro=tutor.endereco_bairro,
                     endereco_cidade=tutor.endereco_cidade,
                     pets=[])

    response.status_code = HTTP_201_CREATED

    return TutorRepository.save(db_tutor, db)


@app.get("/tutores/{tutor_id}")
def recupera_tutor_por_id(tutor_id: str, db: DB_dep):
    tutor_db = TutorRepository.find_by_id(tutor_id, db)

    if not tutor_db:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Tutor não encontrado")

    return tutor_db


@app.delete("/tutores/{tutor_id}")
def remove_tutor_por_id(tutor_id: str, db: DB_dep):
    success = TutorRepository.delete_by_id(tutor_id, db)

    if not success:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail='Tutor não encontrado')


@app.put("/tutores/{tutor_id}")
def atualiza_tutor_por_id(tutor_id: str, tutor: TutorPersist, db: DB_dep):
    retr_tutor = TutorRepository.find_by_id(tutor_id, db)

    if not retr_tutor:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Tutor não encontrado")

    db_tutor = Tutor(id=tutor.id,
                     nome=tutor.nome,
                     genero=tutor.genero,
                     telefone=tutor.telefone,
                     email=tutor.email,
                     endereco_rua=tutor.endereco_rua,
                     endereco_numero=tutor.endereco_numero,
                     endereco_complemento=tutor.endereco_complemento,
                     endereco_bairro=tutor.endereco_bairro,
                     endereco_cidade=tutor.endereco_cidade)

    return TutorRepository.save(db_tutor, db)


# PETS
@app.get("/pets")
def listar_pets(db: DB_dep):
    return PetRepository.find_all(db)


@app.post("/pets")
def adicionar_pet(pet: PetPersist, db: DB_dep, response: Response):
    db_pet = Pet(nome=pet.nome,
                 especie=pet.especie,
                 sexo=pet.sexo,
                 raca=pet.raca,
                 nascimento=pet.nascimento,
                 tamanho=pet.tamanho,
                 peso=pet.peso,
                 cor_pelo=pet.cor_pelo,
                 id_tutor=pet.id_tutor)

    response.status_code = HTTP_201_CREATED

    return PetRepository.save(db, db_pet)


@app.get("/pets/{pet_id}", responses={HTTP_404_NOT_FOUND: {}})
def recuperar_pet_por_id(pet_id: int, db: DB_dep):
    pet_db = PetRepository.find_by_id(db, pet_id)

    if not pet_db:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    return pet_db


@app.put("/pets/{pet_id}",
         responses={HTTP_404_NOT_FOUND: {}})
def atualiza_pet_por_id(pet_id: int, pet: PetPersist, db: DB_dep):
    db_pet = PetRepository.find_by_id(db, pet_id)

    if not db_pet:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    prst_pet = Pet(id=db_pet.id,
                   nome=pet.nome,
                   especie=pet.especie,
                   sexo=pet.sexo,
                   raca=pet.raca,
                   nascimento=pet.nascimento,
                   tamanho=pet.tamanho,
                   peso=pet.peso,
                   cor_pelo=pet.cor_pelo,
                   id_tutor=pet.id_tutor)

    PetRepository.save(db, prst_pet)

    return {"status": "Pet atualizado com sucesso"}


@app.delete("/pets/{pet_id}",
            responses={HTTP_404_NOT_FOUND: {}})
def remove_pet_por_id(pet_id: int, db: DB_dep, response: Response):
    success = PetRepository.delete_by_id(db, pet_id)

    if not success:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Pet não encontrado")

    return {"status", "Pet excluído com sucesso"}
