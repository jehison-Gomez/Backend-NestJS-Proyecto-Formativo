import { Municipio } from './municipio.entity';

export abstract class MunicipioRepository {
  abstract create(municipio: Municipio): Promise<Municipio>;
  abstract findAll(): Promise<Municipio[]>;
  abstract findOne(id: string): Promise<Municipio | null>;
  abstract update(id: string, municipio: Partial<Municipio>): Promise<Municipio>;
  abstract remove(id: string): Promise<void>;
}
