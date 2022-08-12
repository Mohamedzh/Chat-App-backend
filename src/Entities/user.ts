import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm"
import { Post } from "./post";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn( {type: "timestamptz",
    onUpdate: "CURRENT_TIMESTAMPTZ"})
    updatedAt: Date;

    @OneToMany(()=>Post, post=>post.user)
    posts: Post[]

}