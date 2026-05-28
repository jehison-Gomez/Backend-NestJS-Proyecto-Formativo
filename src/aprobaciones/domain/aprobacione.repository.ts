import { Aprobacione } from './aprobacione.entity';

export abstract class AprobacioneRepository {
  abstract create(aprobacione: Aprobacione): Promise<Aprobacione>;
  abstract findAll(): Promise<Aprobacione[]>;
  abstract findOne(id: string): Promise<Aprobacione | null>;
  abstract update(id: string, aprobacione: Partial<Aprobacione>): Promise<Aprobacione>;
  abstract remove(id: string): Promise<void>;
}
