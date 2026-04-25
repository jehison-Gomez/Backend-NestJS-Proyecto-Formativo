import { Centro } from '../entities/centro.entity';

export interface CentroRepository {
  findById(id: number): Promise<Centro | null>;
  findAll(): Promise<Centro[]>;
  create(centro: Partial<Centro>): Promise<Centro>;
  update(id: number, centro: Partial<Centro>): Promise<Centro | null>;
  delete(id: number): Promise<void>;
}