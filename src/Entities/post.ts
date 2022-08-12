import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./user";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn( {type: "timestamptz",
    onUpdate: "CURRENT_TIMESTAMPTZ"})
    updatedAt: Date;

    @ManyToOne(()=>User, user=>user.posts, {nullable: false})
    user: User

}