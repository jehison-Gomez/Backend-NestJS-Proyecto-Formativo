import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SedeEstado } from '../../domain/sede-estado.enum';
import { CentroOrmEntity } from 'src/centros/infrastructure/persistence/centro.orm-entity';
import { AreaOrmEntity } from 'src/areas/infrastructure/persistence/area.orm-entity';

@Entity('sedes')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 225 })
  direccion: string;

  @Column({ type: 'enum', enum: SedeEstado, default: SedeEstado.ACTIVO })
  estado: SedeEstado;

  @ManyToOne(() => CentroOrmEntity, (centro) => centro.sedes, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'centro_id' })
  centro: CentroOrmEntity;

  @OneToMany(() => AreaOrmEntity, (area) => area.sede)
  areas: AreaOrmEntity[];

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
