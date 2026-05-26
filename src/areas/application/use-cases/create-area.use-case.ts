import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { CreateAreaDto } from '../dto/create-area.dto';
import { Area } from '../../domain/area.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneSedeUseCase } from 'src/sedes/application/use-cases/find-one-sede.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class CreateAreaUseCase {
  constructor(
    private readonly areaRepository: AreaRepository,
    private readonly findOneSede: FindOneSedeUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(dto: CreateAreaDto): Promise<Area> {
    const sede = await this.findOneSede.execute(dto.sedeId);
    const usuarioLider = dto.usuarioLiderId
      ? await this.findOneUsuario.execute(dto.usuarioLiderId)
      : undefined;

    try {
      const area = new Area({
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        estado: dto.estado,
        sede,
        usuarioLider,
      });
      return await this.areaRepository.create(area);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
