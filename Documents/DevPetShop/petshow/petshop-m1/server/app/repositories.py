from sqlalchemy.orm import Session

from app.models import Pet

class PetRepository:
    @staticmethod
    def find_all(db: Session) -> list[Pet]:
        return db.query(Pet).order_by(Pet.atualizado_em.desc()).all()

    @staticmethod
    def find_by_id(db: Session, id: int) -> Pet | None:
        return db.query(Pet).filter(Pet.id == id).first()

    @staticmethod
    def save(db:Session, pet: Pet) -> Pet:
        if pet.id:
            db.merge(pet)
        else:
            db.add(pet)
        db.commit()
        return pet

    @staticmethod
    def delete_by_id(db: Session, id: int) -> None:
        pet = db.query(Pet).filter(Pet.id == id).first()
        if pet is not None:
            db.delete(pet)
            db.commit()

    @staticmethod
    def search(db: Session, query: str) -> list[Pet]:
        return db.query(Pet).filter(Pet.nome.istartswith(query)).all()