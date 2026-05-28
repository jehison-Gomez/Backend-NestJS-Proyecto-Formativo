import { BeforeInsert, BeforeUpdate, Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MaterialeEstado } from '../../domain/materiale-estado.enum';
import { TipoMateriale } from '../../domain/tipo-materiale.enum';
import { Categoria_materialOrmEntity } from 'src/categoria_material/infrastructure/persistence/categoria_material.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { Material_itemOrmEntity } from 'src/material_item/infrastructure/persistence/material_item.orm-entity';
import { Material_consumibleOrmEntity } from 'src/material_consumible/infrastructure/persistence/material_consumible.orm-entity';

@Check(`(material_item_id IS NULL) <> (material_consumible_id IS NULL) OR (material_item_id IS NULL AND material_consumible_id IS NULL)`)
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

  @Column({ type: 'enum', enum: TipoMateriale, nullable: true })
  tipoMaterial: TipoMateriale | null;

  @ManyToOne(() => Material_itemOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_item_id' })
  materialItem: Material_itemOrmEntity | null;

  @ManyToOne(() => Material_consumibleOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'material_consumible_id' })
  materialConsumible: Material_consumibleOrmEntity | null;

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
