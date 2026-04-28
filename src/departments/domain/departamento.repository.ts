import { Department } from './department.entity';

export interface DepartmentRepository {
  save(department: Department): Promise<Department>;
  findAll(): Promise<Department[]>;
  findById(id: string): Promise<Department | null>;
  delete(id: string): Promise<void>;
}

// Esto es el puerto - le dice a la aplicacion "qué operaciones existen" sin importar cómo se implementan.

// Token de inyección
export const DEPARTMENT_REPOSITORY = 'DEPARTMENT_REPOSITORY';
