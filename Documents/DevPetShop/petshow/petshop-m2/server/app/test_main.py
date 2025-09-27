import time
from typing import Any

from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND

from app.main import app

client = TestClient(app)


# TUTOR
def test_tutor_insert():
    tutor_id = f"{time.time()}"

    response = client.post("/tutores",
                       json={
                           "id": tutor_id,
                           "nome": "Cascão",
                           "genero": "M",
                           "telefone": "+5599999999999",
                           "email": "zzzz@zmail.com",
                           "endereco_rua": "Rua Projetada",
                           "endereco_numero": "120B",
                           "endereco_complemento": "Apt 15",
                           "endereco_bairro": "Centro",
                           "endereco_cidade": "Centrópolis"
                       })

    response_json: dict[str, Any] = response.json()

    assert response.status_code == HTTP_201_CREATED
    assert response_json["id"] == tutor_id
    assert response_json["nome"] == "Cascão"
    assert response_json["genero"] == "M"
    assert response_json["telefone"] == "+5599999999999"
    assert response_json["email"] == "zzzz@zmail.com"
    assert response_json["endereco_rua"] == "Rua Projetada"
    assert response_json["endereco_numero"] == "120B"
    assert response_json["endereco_complemento"] == "Apt 15"
    assert response_json["endereco_bairro"] == "Centro"
    assert response_json["endereco_cidade"] == "Centrópolis"
    assert response_json.get('pets') is not None and len(response_json['pets']) == 0
    assert response_json.get('criado_em') is not None
    assert response_json.get('atualizado_em') is not None


def test_tutor_get_all():
    tutor_id = f"{time.time()}"

    client.post("/tutores",
                       json={
                           "id": tutor_id,
                           "nome": "Cascão",
                           "genero": "M",
                           "telefone": "+5599999999999",
                           "email": "zzzz@zmail.com",
                           "endereco_rua": "Rua Projetada",
                           "endereco_numero": "120B",
                           "endereco_complemento": "Apt 15",
                           "endereco_bairro": "Centro",
                           "endereco_cidade": "Centrópolis"})

    response = client.get("/tutores")

    response_json = response.json()

    assert response.status_code == HTTP_200_OK
    assert type(response_json) is list
    assert len(response_json) > 0


def test_tutor_get_by_id():
    tutor_id = f"{time.time()}"

    client.post("/tutores",
                       json={"id": tutor_id,
                             "nome": "Cascão",
                             "genero": "M",
                             "telefone": "+5599999999999",
                             "email": "zzzz@zmail.com",
                             "endereco_rua": "Rua Projetada",
                             "endereco_numero": "120B",
                             "endereco_complemento": "Apt 15",
                             "endereco_bairro": "Centro",
                             "endereco_cidade": "Centrópolis"
                             })

    response = client.get(f"/tutores/{tutor_id}")

    response_json = response.json()

    assert response.status_code == HTTP_200_OK
    assert response_json['id'] == tutor_id
    assert response_json["nome"] == "Cascão"
    assert response_json["genero"] == "M"
    assert response_json["telefone"] == "+5599999999999"
    assert response_json["email"] == "zzzz@zmail.com"
    assert response_json["endereco_rua"] == "Rua Projetada"
    assert response_json["endereco_numero"] == "120B"
    assert response_json["endereco_complemento"] == "Apt 15"
    assert response_json["endereco_bairro"] == "Centro"
    assert response_json["endereco_cidade"] == "Centrópolis"
    assert response_json["pets"] == list()

    response = client.get(f"/tutores/-1")

    assert response.status_code == HTTP_404_NOT_FOUND


def test_tutor_delete():
    id_tutor = f"{time.time()}"

    client.post("/tutores",
                   json={"id": id_tutor,
                         "nome": "Cascão",
                         "genero": "M",
                         "telefone": "+5599999999999",
                         "email": "zzzz@zmail.com",
                         "endereco_rua": "Rua Projetada",
                         "endereco_numero": "120B",
                         "endereco_complemento": "Apt 15",
                         "endereco_bairro": "Centro",
                         "endereco_cidade": "Centrópolis"})

    response = client.delete(f"tutores/{id_tutor}")
    assert response.status_code == HTTP_200_OK

    response = client.delete(f"tutores/{id_tutor}")
    assert response.status_code == HTTP_404_NOT_FOUND


def test_tutor_update():
    id_tutor = f"{time.time()}"

    client.post("/tutores",
                   json={"id": id_tutor,
                         "nome": "Cascão",
                         "genero": "M",
                         "telefone": "+5599999999999",
                         "email": "zzzz@zmail.com",
                         "endereco_rua": "Rua Projetada",
                         "endereco_numero": "120B",
                         "endereco_complemento": "Apt 15",
                         "endereco_bairro": "Centro",
                         "endereco_cidade": "Centrópolis"})

    response_put = client.put(f"tutores/{id_tutor}",
                          json={
                              "id": id_tutor,
                              "nome": "Cebolinha",
                              "genero": "M",
                              "telefone": "+5599999999999",
                              "email": "aaaa@zmail.com",
                              "endereco_rua": "Rua Brasil",
                              "endereco_numero": "120B",
                              "endereco_complemento": "Apt 15",
                              "endereco_bairro": "Centro",
                              "endereco_cidade":"Centrópolis"})

    assert response_put.status_code == HTTP_200_OK

    response_get = client.get(f"tutores/{id_tutor}")
    response_json = response_get.json()

    assert response_get.status_code == HTTP_200_OK
    assert response_json["id"] == id_tutor
    assert response_json["nome"] == "Cebolinha"
    assert response_json["genero"] == "M"
    assert response_json["telefone"] == "+5599999999999"
    assert response_json["email"] == "aaaa@zmail.com"
    assert response_json["endereco_rua"] == "Rua Brasil"
    assert response_json["endereco_numero"] == "120B"
    assert response_json["endereco_complemento"] == "Apt 15"
    assert response_json["endereco_bairro"] == "Centro"
    assert response_json["endereco_cidade"] == "Centrópolis"
    assert response_json["pets"] == list()

    response_put = client.put(f"tutores/-1",
                          json={
                              "id": id_tutor,
                              "nome": "Cebolinha",
                              "genero": "M",
                              "telefone": "+5599999999999",
                              "email": "aaaa@zmail.com",
                              "endereco_rua": "Rua Brasil",
                              "endereco_numero": "120B",
                              "endereco_complemento": "Apt 15",
                              "endereco_bairro": "Centro",
                              "endereco_cidade":"Centrópolis"})

    assert response_put.status_code == HTTP_404_NOT_FOUND


# PET
def test_pet_insert():
    tutor_response = client.post("/tutores",
                       json={
                           "id": "99988877765",
                           "nome": "Cascão",
                           "genero": "M",
                           "telefone": "+5599999999999",
                           "email": "zzzz@zmail.com",
                           "endereco_rua": "Rua Projetada",
                           "endereco_numero": "120B",
                           "endereco_complemento": "Apt 15",
                           "endereco_bairro": "Centro",
                           "endereco_cidade":"Centrópolis"
                       })

    id_tutor = tutor_response.json()['id']

    pet_nome = "Totó"
    pet_especie = "Cachorro"
    pet_sexo = "M"
    pet_raca = "SRD"
    pet_nascimento = "2016-05-05"
    pet_tamanho = 87
    pet_peso = 5000
    pet_cor_pelo = "preto"

    response = client.post("/pets",
                json={
                    "nome": pet_nome,
                    "especie": pet_especie,
                    "sexo": pet_sexo,
                    "raca": pet_raca,
                    "nascimento": pet_nascimento,
                    "tamanho": pet_tamanho,
                    "peso": pet_peso,
                    "cor_pelo": pet_cor_pelo,
                    "id_tutor": id_tutor
                })

    response_json = response.json()
    assert response.status_code == HTTP_201_CREATED
    assert response_json['id'] >= 0
    assert response_json['nome'] == pet_nome
    assert response_json['especie'] == pet_especie
    assert response_json['sexo'] == pet_sexo
    assert response_json['raca'] == pet_raca
    assert response_json['nascimento'] == pet_nascimento
    assert response_json['tamanho'] == pet_tamanho
    assert response_json['peso'] == pet_peso
    assert response_json['cor_pelo'] == pet_cor_pelo
    assert response_json['criado_em'] is not None
    assert response_json['atualizado_em'] is not None

def test_pet_get_all():
    tutor_response = client.post("/tutores",
                       json={
                           "id": "99988877765",
                           "nome": "Cascão",
                           "genero": "M",
                           "telefone": "+5599999999999",
                           "email": "zzzz@zmail.com",
                           "endereco_rua": "Rua Projetada",
                           "endereco_numero": "120B",
                           "endereco_complemento": "Apt 15",
                           "endereco_bairro": "Centro",
                           "endereco_cidade": "Centrópolis"
                       })

    id_tutor = tutor_response.json()['id']

    pet_nome = "Totó"
    pet_especie = "Cachorro"
    pet_sexo = "M"
    pet_raca = "SRD"
    pet_nascimento = "2016-05-05"
    pet_tamanho = 87
    pet_peso = 5000
    pet_cor_pelo = "preto"

    client.post("/pets",
                json={
                    "nome": pet_nome,
                    "especie": pet_especie,
                    "sexo": pet_sexo,
                    "raca": pet_raca,
                    "nascimento": pet_nascimento,
                    "tamanho": pet_tamanho,
                    "peso": pet_peso,
                    "cor_pelo": pet_cor_pelo,
                    "id_tutor": id_tutor
                })

    response = client.get("/pets")
    response_json = response.json()

    assert type(response_json) is list
    assert len(response_json) > 0


def test_pet_get_by_id():
    tutor_response = client.post("/tutores",
                       json={
                           "id": "99988877765",
                           "nome": "Cascão",
                           "genero": "M",
                           "telefone": "+5599999999999",
                           "email": "zzzz@zmail.com",
                           "endereco_rua": "Rua Projetada",
                           "endereco_numero": "120B",
                           "endereco_complemento": "Apt 15",
                           "endereco_bairro": "Centro",
                           "endereco_cidade":"Centrópolis"
                       })

    id_tutor = tutor_response.json()['id']

    pet_nome = "Mel"
    pet_especie = "Cachorro"
    pet_sexo = "F"
    pet_raca = "Shitzu"
    pet_nascimento = "2020-05-05"
    pet_tamanho = 45
    pet_peso = 3500
    pet_cor_pelo = "branco"

    ins_response = client.post("/pets",
                json={
                    "nome": pet_nome,
                    "especie": pet_especie,
                    "sexo": pet_sexo,
                    "raca": pet_raca,
                    "nascimento": pet_nascimento,
                    "tamanho": pet_tamanho,
                    "peso": pet_peso,
                    "cor_pelo": pet_cor_pelo,
                    "id_tutor": id_tutor
                })

    ins_response_id = ins_response.json()['id']

    response = client.get(f"/pets/{ins_response_id!s}")
    response_json = response.json()

    assert response.status_code == HTTP_200_OK
    assert response_json['id'] == ins_response_id
    assert response_json["nome"] == pet_nome
    assert response_json["especie"] == pet_especie
    assert response_json["sexo"] == pet_sexo
    assert response_json["raca"] == pet_raca
    assert response_json["nascimento"] == pet_nascimento
    assert response_json["tamanho"] == pet_tamanho
    assert response_json["peso"] == pet_peso
    assert response_json["cor_pelo"] == pet_cor_pelo

    response = client.get(f"/pets/-1")

    assert response.status_code == HTTP_404_NOT_FOUND


def test_pet_update():
    tutor_response = client.post("/tutores",
                       json={"id": "99988877765", "nome": "Cascão", "genero": "M", "telefone": "+5599999999999",
                             "email": "zzzz@zmail.com", "endereco_rua": "Rua Projetada", "endereco_numero": "120B",
                             "endereco_complemento": "Apt 15", "endereco_bairro": "Centro", "endereco_cidade":
                                 "Centrópolis"})

    id_tutor = tutor_response.json()['id']

    pet_nome = "Lua"
    pet_especie = "Gato"
    pet_sexo = "F"
    pet_raca = "SRD"
    pet_nascimento = "2023-08-07"
    pet_tamanho = 65
    pet_peso = 3500
    pet_cor_pelo = "mesclado"

    ins_response = client.post("/pets",
                json={
                    "nome": pet_nome,
                    "especie": pet_especie,
                    "sexo": pet_sexo,
                    "raca": pet_raca,
                    "nascimento": pet_nascimento,
                    "tamanho": pet_tamanho,
                    "peso": pet_peso,
                    "cor_pelo": pet_cor_pelo,
                    "id_tutor": id_tutor
                })

    ins_response_id = ins_response.json()['id']

    response_put = client.put(f"/pets/{ins_response_id!s}",
                              json={
                                  "nome": "Rosa",
                                  "especie": pet_especie,
                                  "sexo": pet_sexo,
                                  "raca": pet_raca,
                                  "nascimento": pet_nascimento,
                                  "tamanho": 70,
                                  "peso": 4500,
                                  "cor_pelo": pet_cor_pelo,
                                  "id_tutor": id_tutor
                              })

    assert response_put.status_code == HTTP_200_OK

    response = client.get(f"/pets/{ins_response_id!s}")
    response_json = response.json()

    assert response_json['nome'] == 'Rosa'
    assert response_json['tamanho'] == 70
    assert response_json["peso"] == 4500

    response_put = client.put(f"/pets/-1",
                              json={
                                  "nome": pet_nome,
                                  "especie": pet_especie,
                                  "sexo": pet_sexo,
                                  "raca": pet_raca,
                                  "nascimento": pet_nascimento,
                                  "tamanho": pet_tamanho,
                                  "peso": pet_peso,
                                  "cor_pelo": pet_cor_pelo,
                                  "id_tutor": id_tutor
                              })

    assert response_put.status_code == HTTP_404_NOT_FOUND


def test_pet_delete():
    tutor_response = client.post("/tutores",
                       json={"id": "99988877765", "nome": "Cascão", "genero": "M", "telefone": "+5599999999999",
                             "email": "zzzz@zmail.com", "endereco_rua": "Rua Projetada", "endereco_numero": "120B",
                             "endereco_complemento": "Apt 15", "endereco_bairro": "Centro", "endereco_cidade":
                                 "Centrópolis"})

    id_tutor = tutor_response.json()['id']

    pet_nome = "Lua"
    pet_especie = "Gato"
    pet_sexo = "F"
    pet_raca = "SRD"
    pet_nascimento = "2023-08-07"
    pet_tamanho = 65
    pet_peso = 3500
    pet_cor_pelo = "mesclado"

    ins_response = client.post("/pets",
                               json={
                                   "nome": pet_nome,
                                   "especie": pet_especie,
                                   "sexo": pet_sexo,
                                   "raca": pet_raca,
                                   "nascimento": pet_nascimento,
                                   "tamanho": pet_tamanho,
                                   "peso": pet_peso,
                                   "cor_pelo": pet_cor_pelo,
                                   "id_tutor": id_tutor
                               })

    ins_response_id = ins_response.json()['id']

    response = client.delete(f"/pets/{ins_response_id!s}")

    assert response.status_code == HTTP_200_OK

    get_response = client.get(f"/pets/{ins_response_id!s}")

    assert get_response.status_code == HTTP_404_NOT_FOUND