import { PrestamoHistorial } from './prestamo_historial.entity';

export abstract class PrestamoHistorialRepository {
  abstract create(h: PrestamoHistorial): Promise<PrestamoHistorial>;
  abstract findByPrestamo(prestamoId: string): Promise<PrestamoHistorial[]>;
}
