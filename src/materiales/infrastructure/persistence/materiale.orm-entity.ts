import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MaterialeEstado } from '../../domain/materiale-estado.enum';
import { Categoria_materialOrmEntity } from 'src/categoria_material/infrastructure/persistence/categoria_material.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';

@Entity('materiales')
export class MaterialeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

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
