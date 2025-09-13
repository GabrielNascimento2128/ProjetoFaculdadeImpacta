from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime, Date, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class Pet(Base):
    __tablename__ = "pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(32))
    especie: Mapped[str] = mapped_column(String(32)) # TODO: criar modelo ou enum?
    sexo: Mapped[str] = mapped_column(String(1))
    raca: Mapped[str] = mapped_column(String(32))
    nascimento: Mapped[Date] = mapped_column(Date)
    tamanho: Mapped[Optional[int]] = mapped_column(Integer, default=0) # em centímetros
    peso: Mapped[Optional[int]] = mapped_column(Integer, default=0) # em gramas
    cor_pelo: Mapped[str] = mapped_column(String(32))
    criado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now)
    atualizado_em: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return (f"Pet(id={self.id!r}, nome={self.nome!r}, especie={self.especie!r}, sexo={self.sexo!r}, "
                f"raca={self.especie!r}, nascimento={self.nascimento!r}, tamanho={self.tamanho!r}, "
                f"peso={self.peso!r}, cor_pelo={self.cor_pelo!r})")
