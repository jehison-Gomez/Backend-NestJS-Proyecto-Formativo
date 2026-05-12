import { Sede } from './sede.entity';

export abstract class SedeRepository {
  abstract create(sede: Sede): Promise<Sede>;
  abstract findAll(): Promise<Sede[]>;
  abstract findOne(id: string): Promise<Sede | null>;
  abstract update(id: string, sede: Partial<Sede>): Promise<Sede>;
  abstract remove(id: string): Promise<void>;
}
