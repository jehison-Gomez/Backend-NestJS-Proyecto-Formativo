import { Usuario_movimiento } from './usuario_movimiento.entity';

export abstract class Usuario_movimientoRepository {
  abstract create(usuario_movimiento: Usuario_movimiento): Promise<Usuario_movimiento>;
  abstract findAll(): Promise<Usuario_movimiento[]>;
  abstract findOne(id: string): Promise<Usuario_movimiento | null>;
  abstract update(id: string, usuario_movimiento: Partial<Usuario_movimiento>): Promise<Usuario_movimiento>;
  abstract remove(id: string): Promise<void>;
}
