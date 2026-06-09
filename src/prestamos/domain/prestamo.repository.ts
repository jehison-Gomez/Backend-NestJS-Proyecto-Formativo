import { Prestamo } from './prestamo.entity';

export abstract class PrestamoRepository {
  abstract create(prestamo: Prestamo): Promise<Prestamo>;
  abstract findAll(): Promise<Prestamo[]>;
  abstract findOne(id: string): Promise<Prestamo | null>;
  abstract findByUsuario(usuarioId: string): Promise<Prestamo[]>;
  abstract update(id: string, prestamo: Partial<Prestamo>): Promise<Prestamo>;
  abstract remove(id: string): Promise<void>;
}
