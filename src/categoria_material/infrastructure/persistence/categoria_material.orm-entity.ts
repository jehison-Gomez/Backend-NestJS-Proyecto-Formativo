import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categoria_materialEstado } from '../../domain/categoria_material-estado.enum';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';

@Entity('categoria_material')
export class Categoria_materialOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'enum', enum: Categoria_materialEstado, default: Categoria_materialEstado.ACTIVO })
  estado: Categoria_materialEstado;

  @OneToMany(() => MaterialeOrmEntity, (m) => m.categoriaMaterial)
  materiales: MaterialeOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim();
    this.descripcion = this.descripcion.trim();
  }
}
