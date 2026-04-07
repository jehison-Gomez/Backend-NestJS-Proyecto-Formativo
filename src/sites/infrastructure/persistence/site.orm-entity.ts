import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CenterOrmEntity } from "src/centers/infrastructure/persistence/center.orm-entity";

@Entity('sede')
export class SiteOrmEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;
   
   @Column('text')
   name: string;

   @Column('uuid')
   center_id: string;

   @Column('text')
   address: string;

   @ManyToOne(() => CenterOrmEntity, (center) => center.sites, {
      nullable: false,
      onDelete: 'RESTRICT',
   })
   @JoinColumn({ name: 'center_id' })
   center: CenterOrmEntity;
}