import { Departamento } from './departamento.entity';

export abstract class DepartamentoRepository {
  abstract create(departamento: Departamento): Promise<Departamento>;
  abstract findAll(): Promise<Departamento[]>;
  abstract findOne(id: string): Promise<Departamento | null>;
  abstract update(id: string, departamento: Partial<Departamento>): Promise<Departamento>;
  abstract remove(id: string): Promise<void>;
}
