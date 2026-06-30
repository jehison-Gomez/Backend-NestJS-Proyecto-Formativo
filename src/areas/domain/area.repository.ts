import { Area } from './area.entity';

export abstract class AreaRepository {
  abstract create(area: Area): Promise<Area>;
  abstract findAll(sedeId?: string | null): Promise<Area[]>;
  abstract findOne(id: string): Promise<Area | null>;
  abstract update(id: string, area: Partial<Area>): Promise<Area>;
  abstract remove(id: string): Promise<void>;
}
