import { Inject, Injectable } from '@nestjs/common';
import { TrasladoRepositorio, TRASLADO_REPOSITORIO } from '../../dominio/traslado.repositorio';
import { EstadoTraslado } from '../../dominio/traslado.entidad';
import { ActualizarTrasladoDto } from '../dto/actualizar-traslado.dto';
import { BuscarUnTrasladoCasoUso } from './buscar-un-traslado.caso-uso';
import { manejarErroresDB } from '../manejar-errores-db';
@Injectable()
export class ActualizarTrasladoCasoUso {
  constructor(
    @Inject(TRASLADO_REPOSITORIO) private readonly repo: TrasladoRepositorio,
    private readonly buscarUno: BuscarUnTrasladoCasoUso,
  ) {}
  async ejecutar(id: number, dto: ActualizarTrasladoDto) {
    const t = await this.buscarUno.ejecutar(id);
    if (dto.motivo !== undefined) t.motivo = dto.motivo;
    if (dto.estado !== undefined) t.estado = dto.estado as EstadoTraslado;
    if (dto.ubicacionDestinoId !== undefined) t.ubicacionDestinoId = dto.ubicacionDestinoId;
    try { return await this.repo.guardar(t); }
    catch (e) { manejarErroresDB(e); }
  }
}