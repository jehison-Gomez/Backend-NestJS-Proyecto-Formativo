import { Centro } from './centro.entity';

export abstract class CentroRepository {
  abstract create(centro: Centro): Promise<Centro>;
  abstract findAll(): Promise<Centro[]>;
  abstract findOne(id: string): Promise<Centro | null>;
  abstract update(id: string, centro: Partial<Centro>): Promise<Centro>;
  abstract remove(id: string): Promise<void>;
}
