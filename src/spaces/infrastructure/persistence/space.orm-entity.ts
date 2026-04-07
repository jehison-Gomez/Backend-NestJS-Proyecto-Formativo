import { SpaceType } from "src/spaces/domain/enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('spaces')
export class SpaceOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column({
        type: 'enum',
        enum: SpaceType,
    })
    type: SpaceType;

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}