import { Devolucione } from './devolucione.entity';

export abstract class DevolucioneRepository {
  abstract create(devolucione: Devolucione): Promise<Devolucione>;
  abstract findAll(): Promise<Devolucione[]>;
  abstract findOne(id: string): Promise<Devolucione | null>;
  abstract update(id: string, devolucione: Partial<Devolucione>): Promise<Devolucione>;
  abstract remove(id: string): Promise<void>;
}
