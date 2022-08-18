import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, ManyToMany, OneToMany } from "typeorm"
import { User } from "./user";
import { Message } from "./message";
import { Chat } from "./chat";

@Entity()
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string
    
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

    @OneToMany(() => Chat, chat => chat.user)
    chats: Chat[]
}

