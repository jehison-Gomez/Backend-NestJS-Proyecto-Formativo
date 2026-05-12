import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AreaEstado } from '../../domain/area-estado.enum';
import { SedeOrmEntity } from 'src/sedes/infrastructure/persistence/sede.orm-entity';
import { ProgramaOrmEntity } from 'src/programas/infrastructure/persistence/programa.orm-entity';

@Entity('areas')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: AreaEstado, default: AreaEstado.ACTIVO })
  estado: AreaEstado;

  @ManyToOne(() => SedeOrmEntity, (sede) => sede.areas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'sede_id' })
  sede: SedeOrmEntity;

  @OneToMany(() => ProgramaOrmEntity, (programa) => programa.area)
  programas: ProgramaOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
  }
}
