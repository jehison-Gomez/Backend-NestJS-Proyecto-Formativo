import { Inject, Injectable } from '@nestjs/common';
import { PrestamoRepositorio, PRESTAMO_REPOSITORIO } from '../../dominio/prestamo.repositorio.js';
import { EstadoPrestamo } from '../../dominio/prestamo.entidad.js';
import { ActualizarPrestamoDto } from '../dto/actualizar-prestamo.dto.js';
import { BuscarUnPrestamoCasoUso } from './buscar-un-prestamo.caso-uso.js';
import { manejarErroresDB } from '../manejar-errores-db.js';
@Injectable()
export class ActualizarPrestamoCasoUso {
  constructor(
    @Inject(PRESTAMO_REPOSITORIO) private readonly repo: PrestamoRepositorio,
    private readonly buscarUno: BuscarUnPrestamoCasoUso,
  ) {}
  async ejecutar(id: number, dto: ActualizarPrestamoDto) {
    const p = await this.buscarUno.ejecutar(id);
    if (dto.estado) p.estado = dto.estado as EstadoPrestamo;
    if (dto.observacion !== undefined) p.observacion = dto.observacion;
    if (dto.fechaVencimiento) p.fechaVencimiento = new Date(dto.fechaVencimiento);
    if (dto.fechaAprobacion) p.fechaAprobacion = new Date(dto.fechaAprobacion);
    try { return await this.repo.guardar(p); }
    catch(e) { manejarErroresDB(e); }
  }
}