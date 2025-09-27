from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime, Date, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class Pet(Base):
    __tablename__ = "pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    criado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now)
    atualizado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    nome: Mapped[str] = mapped_column(String(32))
    especie: Mapped[str] = mapped_column(String(32))
    sexo: Mapped[str] = mapped_column(String(1))
    raca: Mapped[str] = mapped_column(String(32))
    nascimento: Mapped[Date] = mapped_column(Date)
    tamanho: Mapped[Optional[int]] = mapped_column(Integer, default=0) # em centímetros
    peso: Mapped[Optional[int]] = mapped_column(Integer, default=0) # em gramas
    cor_pelo: Mapped[str] = mapped_column(String(32))

    id_tutor: Mapped[str] = mapped_column(ForeignKey("tutor.id"))
    tutor: Mapped["Tutor"] = relationship(back_populates="pets")

    def __repr__(self):
        return (f"Pet(id={self.id!r}, nome={self.nome!r}, especie={self.especie!r}, sexo={self.sexo!r}, "
                f"raca={self.especie!r}, nascimento={self.nascimento!r}, tamanho={self.tamanho!r}, "
                f"peso={self.peso!r}, cor_pelo={self.cor_pelo!r})")


class Tutor(Base):
    __tablename__ = "tutor"

    id: Mapped[str] = mapped_column(String(32), primary_key=True) #CPF ou Identidade
    criado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now)
    atualizado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    nome: Mapped[str] = mapped_column(String(64))
    genero: Mapped[str] = mapped_column(String(1))
    telefone: Mapped[str] = mapped_column(String(16))
    email: Mapped[Optional[str]] = mapped_column(String(64))
    endereco_rua: Mapped[str] = mapped_column(String(64))
    endereco_numero: Mapped[str] = mapped_column(String(16))
    endereco_complemento: Mapped[Optional[str]] = mapped_column(String(64))
    endereco_bairro: Mapped[str] = mapped_column(String(64))
    endereco_cidade: Mapped[str] = mapped_column(String(64))

    pets: Mapped[list["Pet"]] = relationship(back_populates="tutor",
                                             cascade="delete, delete-orphan",
                                             lazy="selectin")

    def __repr__(self):
        return (f"Tutor(id={self.id!r}, nome={self.nome!r}, genero={self.genero!r}, telefone="
                f"{self.telefone!r}, email={self.email!r}, endereco={self.endereco_rua!r}, {self.endereco_numero!r}, "
                f"{self.endereco_bairro!r}, {self.endereco_cidade!r}, pets={self.pets!r})")


class Funcionario(Base):
    __tablename__ = "funcionario"

    id: Mapped[int] = mapped_column(primary_key=True)
    criado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now)
    atualizado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
    funcao: Mapped[str] = mapped_column(String(64))
    nome: Mapped[str] = mapped_column(String(64))
    genero: Mapped[str] = mapped_column(String(1))
    telefone: Mapped[str] = mapped_column(String(16))
    email: Mapped[Optional[str]] = mapped_column(String(64))
    endereco_rua: Mapped[str] = mapped_column(String(64))
    endereco_numero: Mapped[str] = mapped_column(String(16))
    endereco_complemento: Mapped[Optional[str]] = mapped_column(String(64))
    endereco_bairro: Mapped[str] = mapped_column(String(64))
    endereco_cidade: Mapped[str] = mapped_column(String(64))

    def __repr__(self):
        return (f"Funcionario(id={self.id!r}, nome={self.nome!r}, genero={self.genero!r}, telefone={self.telefone!r}, "
                f"email={self.email!r}, endereco={self.endereco_rua!r}, {self.endereco_numero!r}, "
                f"{self.endereco_bairro!r}, {self.endereco_cidade!r})")