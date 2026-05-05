import { Municipio } from './municipio.entity';

export abstract class MunicipioRepository {
  abstract create(municipio: Municipio): Promise<Municipio>;
  abstract findAll(): Promise<Municipio[]>;
  abstract findOne(id: number): Promise<Municipio | null>;
  abstract update(
    id: number,
    municipio: Partial<Municipio>,
  ): Promise<Municipio>;
  abstract remove(id: number): Promise<void>;
}
