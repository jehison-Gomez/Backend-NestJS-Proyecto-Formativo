import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProgramaEstado } from '../../domain/programa-estado.enum';
import { ProgramaNivelFormacion } from '../../domain/programa-nivel-formacion.enum';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';

@Entity('programas')
export class ProgramaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 20 })
  codigo: string;

  @Column({ type: 'enum', enum: ProgramaNivelFormacion })
  nivelFormacion: ProgramaNivelFormacion;

  @Column({ type: 'enum', enum: ProgramaEstado, default: ProgramaEstado.ACTIVO })
  estado: ProgramaEstado;

  @ManyToOne(() => AreaOrmEntity, (area) => area.programas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'area_id' })
  area: AreaOrmEntity;

  @OneToMany(() => FichaOrmEntity, (ficha) => ficha.programa)
  fichas: FichaOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim();
    this.codigo = this.codigo.trim();
  }
}
