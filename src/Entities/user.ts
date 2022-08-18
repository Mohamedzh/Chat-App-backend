import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Conversation } from "./conversation";
import { Message } from "./message";
import { Chat } from "./chat"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    onUpdate: "CURRENT_TIMESTAMPTZ"
  })
  updatedAt: Date;

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @ManyToMany(() => Conversation, conversation => conversation.users)
  @JoinTable()
  conversations: Conversation[]

  @OneToMany(() => Chat, chat => chat.user)
  chats: Chat[]
}

