import { Departamento } from './departamento.entity';

export abstract class DepartamentoRepository {
  abstract create(departamento: Departamento): Promise<Departamento>;
  abstract findAll(): Promise<Departamento[]>;
  abstract findOne(id: number): Promise<Departamento | null>;
  abstract update(
    id: number,
    departamento: Partial<Departamento>,
  ): Promise<Departamento>;
  abstract remove(id: number): Promise<void>;
}
