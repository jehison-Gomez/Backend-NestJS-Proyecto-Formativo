import { Sede } from '../entities/sede.entity';

export interface SedeRepository {
  findById(id: number): Promise<Sede | null>;
  findAll(): Promise<Sede[]>;
  create(sede: Partial<Sede>): Promise<Sede>;
  update(id: number, sede: Partial<Sede>): Promise<Sede | null>;
  delete(id: number): Promise<void>;
}