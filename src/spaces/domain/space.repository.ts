import { Space } from './space.entity';

export interface SpaceRepository {
  save(space: Space): Promise<Space>;
  findAll(): Promise<Space[]>;
  findById(id: string): Promise<Space | null>;
  delete(id: string): Promise<void>;
}

// Token de inyección
export const SPACE_REPOSITORY = 'SPACE_REPOSITORY';