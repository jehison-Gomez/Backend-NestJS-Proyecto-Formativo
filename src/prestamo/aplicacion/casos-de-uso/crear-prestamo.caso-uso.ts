import { Inject, Injectable } from '@nestjs/common';
import { PrestamoRepositorio, PRESTAMO_REPOSITORIO } from '../../dominio/prestamo.repositorio.js';
import { Prestamo, EstadoPrestamo } from '../../dominio/prestamo.entidad.js';
import { CrearPrestamoDto } from '../dto/crear-prestamo.dto.js';
import { manejarErroresDB } from '../manejar-errores-db.js';

@Injectable()
export class CrearPrestamoCasoUso {
  constructor(@Inject(PRESTAMO_REPOSITORIO) private readonly repo: PrestamoRepositorio) {}
  async ejecutar(dto: CrearPrestamoDto): Promise<Prestamo> {
    const p = new Prestamo();
    p.codigoPrestamo = dto.codigoPrestamo;
    p.fechaSolicitud = new Date(dto.fechaSolicitud);
    p.estado = dto.estado as EstadoPrestamo;
    p.idUsuario = dto.idUsuario;
    p.observacion = dto.observacion;
    if (dto.fechaAprobacion) p.fechaAprobacion = new Date(dto.fechaAprobacion);
    if (dto.fechaVencimiento) p.fechaVencimiento = new Date(dto.fechaVencimiento);
    try { return await this.repo.guardar(p); }
    catch(e) { manejarErroresDB(e); }
  }
}