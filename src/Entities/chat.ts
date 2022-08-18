import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { Conversation } from "./conversation";
import { Message } from "./message";
import { User } from "./user";

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    })
    updatedAt: Date;

    @ManyToOne(() => Conversation, conversation => conversation.chats)
    conversation: Conversation
    
    @ManyToOne(() => User, user => user.chats)
    user: User

}

