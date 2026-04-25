import { Area } from '../entities/area.entity';

export interface AreaRepository {
  findById(id: number): Promise<Area | null>;
  findAll(): Promise<Area[]>;
  create(area: Partial<Area>): Promise<Area>;
  update(id: number, area: Partial<Area>): Promise<Area | null>;
  delete(id: number): Promise<void>;
}