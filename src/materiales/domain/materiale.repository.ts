import { Materiale } from './materiale.entity';

export abstract class MaterialeRepository {
  abstract create(materiale: Materiale): Promise<Materiale>;
  abstract findAll(): Promise<Materiale[]>;
  abstract findOne(id: string): Promise<Materiale | null>;
  abstract update(id: string, materiale: Partial<Materiale>): Promise<Materiale>;
  abstract remove(id: string): Promise<void>;
}
