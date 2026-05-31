import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CentroEstado } from '../../domain/centro-estado.enum';
import { MunicipioOrmEntity } from 'src/municipios/infrastructure/persistence/municipio.orm-entity';
import { SedeOrmEntity } from 'src/sedes/infrastructure/persistence/sede.orm-entity';

@Entity('centros')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 225 })
  direccion: string;

  @Column({ type: 'enum', enum: CentroEstado, default: CentroEstado.ACTIVO })
  estado: CentroEstado;

  @OneToOne(() => MunicipioOrmEntity, (municipio) => municipio.centro, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'municipio_id' })
  municipio: MunicipioOrmEntity;

  @OneToMany(() => SedeOrmEntity, (sede) => sede.centro)
  sedes: SedeOrmEntity[];

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
