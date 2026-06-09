import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MaterialeEstado } from '../../domain/materiale-estado.enum';
import { TipoMateriale } from '../../domain/tipo-materiale.enum';
import { Categoria_materialOrmEntity } from 'src/categoria_material/infrastructure/persistence/categoria_material.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { UbicacionOrmEntity } from 'src/ubicacion/infrastructure/persistence/ubicacion.orm-entity';

@Entity('materiales')
export class MaterialeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  sku: string | null;

  @Column({ type: 'enum', enum: TipoMateriale, nullable: false, default: TipoMateriale.ITEM, name: 'tipo' })
  tipo: TipoMateriale;

  @Column({ type: 'enum', enum: MaterialeEstado, default: MaterialeEstado.ACTIVO })
  estado: MaterialeEstado;

  @ManyToOne(() => Categoria_materialOrmEntity, (cm) => cm.materiales, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoria_material_id' })
  categoriaMaterial: Categoria_materialOrmEntity;

  @ManyToOne(() => FichaOrmEntity, (ficha) => ficha.materiales, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @ManyToOne(() => UbicacionOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: UbicacionOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim();
  }
}
