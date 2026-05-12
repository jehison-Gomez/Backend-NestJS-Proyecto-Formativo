import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DepartamentoEstado } from '../../domain/departamento-estado.enum';
import { MunicipioOrmEntity } from 'src/municipios/infrastructure/persistence/municipio.orm-entity';

@Entity('departamentos')
export class DepartamentoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'enum', enum: DepartamentoEstado, default: DepartamentoEstado.ACTIVO })
  estado: DepartamentoEstado;

  @OneToMany(() => MunicipioOrmEntity, (municipio) => municipio.departamento)
  municipios: MunicipioOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.codigo = this.codigo.trim().toLowerCase();
  }
}
