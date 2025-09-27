from sqlalchemy.orm import Session

from app.models import Pet, Tutor, Funcionario, Atendimento


class PetRepository:
    @staticmethod
    def find_all(db: Session) -> list[Pet]:
        return db.query(Pet).order_by(Pet.atualizado_em.desc()).all()

    @staticmethod
    def find_by_id(pet_id: int, db: Session) -> Pet | None:
        return db.get(Pet, pet_id)

    @staticmethod
    def find_by_tutor(id_tutor: str, db: Session) -> list[Pet]:
        return (db.query(Pet)
                .filter(Pet.id_tutor == id_tutor)
                .order_by(Pet.atualizado_em.desc())
                .all())

    @staticmethod
    def save(pet: Pet, db: Session) -> Pet:
        if pet.id:
            pet = db.merge(pet)
        else:
            db.add(pet)

        db.commit()
        db.refresh(pet)
        return pet

    @staticmethod
    def delete_by_id(id: int, db: Session) -> bool:
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
    def find_by_id(id: int, db: Session) -> Funcionario | None:
        return db.get(Funcionario, id)

    @staticmethod
    def save(funcionario: Funcionario, db: Session) -> Funcionario:
        if funcionario.id:
            funcionario = db.merge(funcionario)
        else:
            db.add(funcionario)

        db.commit()
        db.refresh(funcionario)
        return funcionario

    @staticmethod
    def delete_by_id(id: int, db: Session) -> bool:
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


class AtendimentoRepository:
    @staticmethod
    def find_all(db: Session) -> list[Atendimento]:
        return db.query(Atendimento).all()


    @staticmethod
    def find_by_id(id_atendimento: int, db: Session) -> Atendimento | None:
        return db.get(Atendimento, id_atendimento)


    @staticmethod
    def find_by_id_pet(id_pet: int, db: Session) -> list[Atendimento]:
        return db.query(Atendimento).filter(Atendimento.id_pet == id_pet).all()


    @staticmethod
    def find_by_id_funcionario(id_funcionario: int, db: Session) -> list[Atendimento]:
        return db.query(Atendimento).filter(Atendimento.id_funcionario == id_funcionario).all()


    @staticmethod
    def save(atendimento: Atendimento, db: Session) -> Atendimento:
        atendimento_db = db.get(Atendimento, atendimento.id)

        if atendimento_db is None:
            db.add(atendimento)
        else:
            atendimento = db.merge(atendimento)
        db.commit()
        db.refresh(atendimento)

        return atendimento


    @staticmethod
    def delete_by_id(id_atendimento: int, db: Session) -> bool:
        atendimento = db.get(Atendimento, id_atendimento)

        if atendimento is not None:
            db.delete(atendimento)
            db.commit()
            return True
        else:
            return False
