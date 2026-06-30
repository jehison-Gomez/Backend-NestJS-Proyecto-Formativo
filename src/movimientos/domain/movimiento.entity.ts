import { MovimientoEstado } from './movimiento-estado.enum';
import { MovimientoTipo } from './movimiento-tipo.enum';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Material_item } from 'src/material_item/domain/material_item.entity';
import { Material_consumible } from 'src/material_consumible/domain/material_consumible.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

export class Movimiento {
  id: string;
  tipo: MovimientoTipo;
  cantidad: number;
  descripcion: string;
  estado: MovimientoEstado;
  prestamo?: Prestamo | null;
  devolucion?: any | null;
  materialItem?: Material_item | null;
  materialConsumible?: Material_consumible | null;
  usuario?: Usuario | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Movimiento>) {
    Object.assign(this, partial);
  }
}
