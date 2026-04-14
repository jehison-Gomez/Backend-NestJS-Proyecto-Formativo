import { Inject, Injectable } from '@nestjs/common';
import { MaterialUbicacionRepositorio, MATERIAL_UBICACION_REPOSITORIO } from '../../dominio/material-ubicacion.repositorio';
import { MaterialUbicacion } from '../../dominio/material-ubicacion.entidad';
import { CrearMaterialUbicacionDto } from '../dto/crear-material-ubicacion.dto';
import { manejarErroresDB } from '../manejar-errores-db';
@Injectable()
export class CrearMaterialUbicacionCasoUso {
  constructor(@Inject(MATERIAL_UBICACION_REPOSITORIO) private readonly repo: MaterialUbicacionRepositorio) {}
  async ejecutar(dto: CrearMaterialUbicacionDto): Promise<MaterialUbicacion> {
    const mu = new MaterialUbicacion();
    mu.materialId = dto.materialId; mu.ubicacionId = dto.ubicacionId;
    try { return await this.repo.guardar(mu); }
    catch (e) { manejarErroresDB(e); }
  }
}