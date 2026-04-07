// domain/program.repository.ts
import { Program } from './program.entity';

export interface ProgramRepository {
  save(program: Program): Promise<Program>;
  findAll(): Promise<Program[]>;
  findById(id: string): Promise<Program | null>;
  delete(id: string): Promise<void>;
}

// Token de inyección
export const PROGRAM_REPOSITORY = 'PROGRAM_REPOSITORY';