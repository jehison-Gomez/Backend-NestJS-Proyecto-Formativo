import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MaterialeOrmEntity }    from 'src/materiales/infrastructure/persistence/materiale.orm-entity';
import { UbicacionOrmEntity }    from 'src/ubicacion/infrastructure/persistence/ubicacion.orm-entity';

@Entity('material_ubicacion')
export class Material_ubicacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_id' })
  material: MaterialeOrmEntity;

  @ManyToOne(() => UbicacionOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: UbicacionOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
