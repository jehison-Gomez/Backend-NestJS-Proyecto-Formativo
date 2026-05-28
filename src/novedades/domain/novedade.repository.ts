import { Novedade } from './novedade.entity';

export abstract class NovedadeRepository {
  abstract create(novedade: Novedade): Promise<Novedade>;
  abstract findAll(): Promise<Novedade[]>;
  abstract findOne(id: string): Promise<Novedade | null>;
  abstract update(id: string, novedade: Partial<Novedade>): Promise<Novedade>;
  abstract remove(id: string): Promise<void>;
}
