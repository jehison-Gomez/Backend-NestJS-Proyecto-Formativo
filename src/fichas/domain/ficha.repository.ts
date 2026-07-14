import { Ficha } from './ficha.entity';

export abstract class FichaRepository {
  abstract create(ficha: Ficha): Promise<Ficha>;
  abstract findAll(sedeId?: string | null): Promise<Ficha[]>;
  abstract findOne(id: string): Promise<Ficha | null>;
  abstract update(id: string, ficha: Partial<Ficha>): Promise<Ficha>;
  abstract remove(id: string): Promise<void>;
  abstract findSedeIdByFichaId(fichaId: string): Promise<string | null>;
}
