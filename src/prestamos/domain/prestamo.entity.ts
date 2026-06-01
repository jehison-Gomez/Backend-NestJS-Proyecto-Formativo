import { PrestamoEstado } from './prestamo-estado.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Material_item } from 'src/material_item/domain/material_item.entity';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Material_consumible } from 'src/material_consumible/domain/material_consumible.entity';

export class PrestamoConsumibleDetalle {
  materiale: Materiale;
  materialConsumible: Material_consumible;
  cantidadPrestada: number;
}

export class Prestamo {
  id: string;
  motivo: string;
  observacion: string;
  fechaRegistro: Date;
  fechaInicio: Date;
  fechaFin: Date;
  estado: PrestamoEstado;
  usuario: Usuario;
  ficha: Ficha;
  beneficiarios: Usuario[];
  materialItems: Material_item[];
  materialConsumibles: PrestamoConsumibleDetalle[];
  aprobadoPor?: Usuario;
  aprobadoPorId?: string;
  fechaAprobacion?: Date;
  rechazadoPor?: Usuario;
  rechazadoPorId?: string;
  fechaRechazo?: Date;
  fechaEntrega?: Date;
  fechaDevolucion?: Date;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Prestamo>) {
    Object.assign(this, partial);
  }
}
