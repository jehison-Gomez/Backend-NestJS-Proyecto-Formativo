import { Area } from './area.entity';

export abstract class AreaRepository {
  abstract create(area: Area): Promise<Area>;
  abstract findAll(): Promise<Area[]>;
  abstract findOne(id: number): Promise<Area | null>;
  abstract update(id: number, area: Partial<Area>): Promise<Area>;
  abstract remove(id: number): Promise<void>;
}
