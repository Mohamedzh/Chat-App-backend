import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, ManyToMany, OneToMany } from "typeorm"
import { User } from "./user";
import { Message } from "./message";

@Entity()
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    })
    updatedAt: Date;

    @OneToMany(() => Message, message => message.conversation)
    messages: Message[]

    @ManyToMany(() => User, (user) => user.conversations)
    users: User[]

}

