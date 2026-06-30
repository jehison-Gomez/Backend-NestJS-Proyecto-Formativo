import { Programa } from './programa.entity';

export abstract class ProgramaRepository {
  abstract create(programa: Programa): Promise<Programa>;
  abstract findAll(): Promise<Programa[]>;
  abstract findOne(id: string): Promise<Programa | null>;
  abstract update(id: string, programa: Partial<Programa>): Promise<Programa>;
  abstract remove(id: string): Promise<void>;
}
