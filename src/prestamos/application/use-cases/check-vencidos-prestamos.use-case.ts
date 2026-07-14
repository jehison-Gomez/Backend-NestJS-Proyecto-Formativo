import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { CreatePrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/create-prestamo_historial.use-case';

@Injectable()
export class CheckVencidosPrestamosUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly createHistorial: CreatePrestamoHistorialUseCase,
  ) {}

  async execute(): Promise<{ marcados: number }> {
    const vencidos = await this.prestamoRepository.findOverdue();
    let marcados = 0;

    for (const p of vencidos) {
      await this.prestamoRepository.update(p.id, { estado: PrestamoEstado.VENCIDO });
      try {
        await this.createHistorial.execute({
          prestamoId:     p.id,
          estadoAnterior: p.estado,
          estadoNuevo:    PrestamoEstado.VENCIDO,
          usuarioId:      null,
          observacion:    'Marcado automáticamente por vencimiento de fecha',
        });
      } catch { /* no interrumpir */ }
      marcados++;
    }

    return { marcados };
  }
}
