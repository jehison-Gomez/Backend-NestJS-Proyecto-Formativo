import { Sede } from './sede.entity';

export abstract class SedeRepository {
  abstract create(sede: Sede): Promise<Sede>;
  abstract findAll(): Promise<Sede[]>;
  abstract findOne(id: number): Promise<Sede | null>;
  abstract update(id: number, sede: Partial<Sede>): Promise<Sede>;
  abstract remove(id: number): Promise<void>;
}
