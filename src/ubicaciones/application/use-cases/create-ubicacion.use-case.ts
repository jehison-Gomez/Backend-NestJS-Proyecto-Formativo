import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { CreateUbicacionDto } from '../dto/create-ubicacion.dto';
import { Ubicacion } from '../../domain/ubicacion.entity';

export class CreateUbicacionUseCase {
  constructor(private readonly repository: UbicacionRepository) {}

  async execute(dto: CreateUbicacionDto): Promise<Ubicacion> {
    const ubicacion = new Ubicacion();
    Object.assign(ubicacion, dto);
    return this.repository.save(ubicacion);
  }
}
