from fastapi.testclient import TestClient
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND

from app.main import app

client = TestClient(app)


def test_insert():
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
                    "cor_pelo": pet_cor_pelo
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

def test_get_all():
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
                    "cor_pelo": pet_cor_pelo
                })

    response = client.get("/pets")
    response_json = response.json()

    assert type(response_json) is list
    assert len(response_json) > 0


def test_get_by_id():
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
                    "cor_pelo": pet_cor_pelo
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


def test_update():
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
                    "cor_pelo": pet_cor_pelo
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
                                  "cor_pelo": pet_cor_pelo
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
                                  "cor_pelo": pet_cor_pelo
                              })

    assert response_put.status_code == HTTP_404_NOT_FOUND


def test_delete():
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
                                   "cor_pelo": pet_cor_pelo
                               })

    ins_response_id = ins_response.json()['id']

    response = client.delete(f"/pets/{ins_response_id!s}")

    assert response.status_code == HTTP_200_OK

    get_response = client.get(f"/pets/{ins_response_id!s}")

    assert get_response.status_code == HTTP_404_NOT_FOUND