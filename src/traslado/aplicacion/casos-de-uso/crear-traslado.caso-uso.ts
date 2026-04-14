import { Inject, Injectable } from '@nestjs/common';
import { TrasladoRepositorio, TRASLADO_REPOSITORIO } from '../../dominio/traslado.repositorio';
import { Traslado, EstadoTraslado } from '../../dominio/traslado.entidad';
import { CrearTrasladoDto } from '../dto/crear-traslado.dto';
import { manejarErroresDB } from '../manejar-errores-db';

@Injectable()
export class CrearTrasladoCasoUso {
  constructor(@Inject(TRASLADO_REPOSITORIO) private readonly repo: TrasladoRepositorio) {}
  async ejecutar(dto: CrearTrasladoDto): Promise<Traslado> {
    const t = new Traslado();
    t.fechaTraslado = new Date(dto.fechaTraslado);
    t.motivo = dto.motivo; t.estado = dto.estado as EstadoTraslado;
    t.usuarioId = dto.usuarioId;
    t.ubicacionDestinoId = dto.ubicacionDestinoId;
    t.ubicacionOrigenId = dto.ubicacionOrigenId;
    try { return await this.repo.guardar(t); }
    catch (e) { manejarErroresDB(e); }
  }
}