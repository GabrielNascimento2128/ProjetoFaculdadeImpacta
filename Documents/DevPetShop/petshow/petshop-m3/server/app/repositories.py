from sqlalchemy.orm import Session

from app.models import Pet, Tutor, Funcionario


class PetRepository:
    @staticmethod
    def find_all(db: Session) -> list[Pet]:
        return db.query(Pet).order_by(Pet.atualizado_em.desc()).all()

    @staticmethod
    def find_by_id(db: Session, id: int) -> Pet | None:
        return db.get(Pet, id)

    @staticmethod
    def save(db:Session, pet: Pet) -> Pet:
        if pet.id:
            pet = db.merge(pet)
        else:
            db.add(pet)

        db.commit()
        db.refresh(pet)
        return pet

    @staticmethod
    def delete_by_id(db: Session, id: int) -> bool:
        pet = db.get(Pet, id)

        if pet is not None:
            db.delete(pet)
            db.commit()
            return True
        else:
            return False

    @staticmethod
    def search(db: Session, query: str) -> list[Pet]:
        return db.query(Pet).filter(Pet.nome.istartswith(query)).all()


class TutorRepository:
    @staticmethod
    def find_all(db: Session) -> list[Tutor]:
        return db.query(Tutor).order_by(Tutor.atualizado_em.desc()).all()

    @staticmethod
    def find_by_id(tutor_id: str, db: Session) -> Tutor | None:
        return db.get(Tutor, tutor_id)

    @staticmethod
    def save(tutor: Tutor, db: Session) -> Tutor:
        tutor_db = db.get(Tutor, tutor.id)

        if tutor_db is None:
            db.add(tutor)
        else:
            tutor = db.merge(tutor)
        db.commit()
        db.refresh(tutor)

        return tutor

    @staticmethod
    def delete_by_id(tutor_id: str, db: Session) -> bool:
        tutor = db.get(Tutor, tutor_id)

        if tutor is not None:
            db.delete(tutor)
            db.commit()
            return True
        else:
            return False

    @staticmethod
    def search(db: Session, query: str) -> list[Tutor]:
        return db.query(Tutor).filter(Tutor.id.istartswith(query)).all()


class FuncionarioRepository:
    @staticmethod
    def find_all(db: Session) -> list[Funcionario]:
        return db.query(Funcionario).order_by(Funcionario.atualizado_em.desc()).all()

    @staticmethod
    def find_by_id(db: Session, id: int) -> Funcionario | None:
        return db.get(Funcionario, id)

    @staticmethod
    def save(db: Session, funcionario: Funcionario) -> Funcionario:
        if funcionario.id:
            funcionario = db.merge(funcionario)
        else:
            db.add(funcionario)

        db.commit()
        db.refresh(funcionario)
        return funcionario

    @staticmethod
    def delete_by_id(db: Session, id: int) -> bool:
        funcionario = db.get(Funcionario, id)

        if funcionario is not None:
            db.delete(funcionario)
            db.commit()
            return True
        else:
            return False

    @staticmethod
    def search(db: Session, query: str) -> list[Funcionario]:
        return db.query(Funcionario).filter(Funcionario.nome.istartswith(query)).all()