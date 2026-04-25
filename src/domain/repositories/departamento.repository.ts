import { Departamento } from '../entities/departamento.entity';

export interface DepartamentoRepository {
  findById(id: number): Promise<Departamento | null>;
  findAll(): Promise<Departamento[]>;
  create(departamento: Partial<Departamento>): Promise<Departamento>;
  update(id: number, departamento: Partial<Departamento>): Promise<Departamento | null>;
  delete(id: number): Promise<void>;
}