import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MunicipioEstado } from '../../domain/municipio-estado.enum';
import { Departamento } from 'src/departamentos/domain/departamento.entity';
import { DepartamentoOrmEntity } from 'src/departamentos/infrastructure/persistence/departamento.orm-entity';
import { CentroOrmEntity } from 'src/centros/infrastructure/persistence/centro.orm-entity';

@Entity('municipios')
export class MunicipioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'enum', enum: MunicipioEstado, default: MunicipioEstado.ACTIVO })
  estado: MunicipioEstado;

  @ManyToOne(() => DepartamentoOrmEntity, (departamento) => departamento.municipios, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'departamento_id' })
  departamento: DepartamentoOrmEntity;

  @OneToOne(() => CentroOrmEntity, (centro) => centro.municipio)
  centro: CentroOrmEntity;

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
