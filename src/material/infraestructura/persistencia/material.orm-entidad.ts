import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoMaterial } from '../../dominio/material.entidad';

@Entity('material')
export class MaterialOrmEntidad {

  @PrimaryGeneratedColumn({ name: 'ID_Material' })
  id: number;

  @Column({ name: 'Nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'Codigo_UNCS', type: 'varchar', length: 100, nullable: true })
  codigoUncs?: string;

  @Column({ name: 'Codigo_SKU', type: 'varchar', length: 100, nullable: true })
  codigoSku?: string;

  @Column({ name: 'Codigo_Barras', type: 'varchar', length: 100, nullable: true })
  codigoBarras?: string;

  @Column({ name: 'Tipo', type: 'enum', enum: TipoMaterial })
  tipo: TipoMaterial;

  @Column({ name: 'Categoria', type: 'varchar', length: 100, nullable: true })
  categoria?: string;

  @Column({ name: 'Unidad_Medida', type: 'varchar', length: 50 })
  unidadMedida: string;

  @Column({ name: 'Fecha_Vencimiento', type: 'date', nullable: true })
  fechaVencimiento?: Date;

  @Column({ name: 'Lote', type: 'varchar', length: 100, nullable: true })
  lote?: string;

  @Column({ name: 'Estado_Fisico', type: 'varchar', length: 100, nullable: true })
  estadoFisico?: string;

  
}