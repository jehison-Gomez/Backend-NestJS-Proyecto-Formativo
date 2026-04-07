import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sede')
export class SiteOrmEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;
   
   @Column('text')
   name: string;

    @Column('text')
    address: string;
}