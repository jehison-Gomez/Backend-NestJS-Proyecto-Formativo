import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamoOrmEntity } from './prestamo.orm-entity';
import { MaterialeOrmEntity } from 'src/materiales/infrastructure/persistence/materiale.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';

@Entity('prestamo_material_consumible')
export class PrestamoMaterialConsumibleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PrestamoOrmEntity, (p) => p.materialConsumibles, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => MaterialeOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'materiale_id' })
  materiale: MaterialeOrmEntity;

  @ManyToOne(() => Material_consumibleOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_consumible_id' })
  materialConsumible: Material_consumibleOrmEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidadPrestada: number;
}
