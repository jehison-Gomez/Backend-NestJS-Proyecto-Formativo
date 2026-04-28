import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { UpdateUbicacionDto } from '../dto/update-ubicacion.dto';

export class UpdateUbicacionUseCase {
  constructor(private readonly repository: UbicacionRepository) {}

  async execute(id: string, dto: UpdateUbicacionDto) { // Corregido a string
    const ubicacion = await this.repository.findById(id);
    if (!ubicacion) return null;
    
    return this.repository.save({ ...ubicacion, ...dto } as any);
  }
}