import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindOneFichaUseCase } from './find-one-ficha.use-case';

export interface AprendizInfo {
  id: string;
  nombre: string;
  correo: string;
  numeroDocumento: string;
  telefono: string;
  estado: string;
}

@Injectable()
export class FindAprendicesByFichaUseCase {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly findOneFicha: FindOneFichaUseCase,
  ) {}

  async execute(fichaId: string): Promise<AprendizInfo[]> {
    const ficha = await this.findOneFicha.execute(fichaId);
    if (!ficha) throw new NotFoundException(`Ficha #${fichaId} no encontrada`);

    return this.dataSource.query(
      `SELECT u.id, u.nombre, u.correo, u.numero_documento AS "numeroDocumento",
              u.telefono, u.estado
       FROM usuarios u
       INNER JOIN roles r ON r.id = u.role_id
       WHERE u.ficha_id = $1
         AND u.estado = 'activo'
         AND UPPER(r.nombre) = 'APRENDIZ'`,
      [fichaId],
    );
  }
}
