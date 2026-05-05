import { Centro } from './centro.entity';

export abstract class CentroRepository {
  abstract create(centro: Centro): Promise<Centro>;
  abstract findAll(): Promise<Centro[]>;
  abstract findOne(id: number): Promise<Centro | null>;
  abstract update(id: number, centro: Partial<Centro>): Promise<Centro>;
  abstract remove(id: number): Promise<void>;
}
