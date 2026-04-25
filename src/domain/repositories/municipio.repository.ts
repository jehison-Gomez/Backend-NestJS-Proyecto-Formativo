import { Municipio } from '../entities/municipio.entity';

export interface MunicipioRepository {
  findById(id: number): Promise<Municipio | null>;
  findAll(): Promise<Municipio[]>;
  create(municipio: Partial<Municipio>): Promise<Municipio>;
  update(id: number, municipio: Partial<Municipio>): Promise<Municipio | null>;
  delete(id: number): Promise<void>;
}