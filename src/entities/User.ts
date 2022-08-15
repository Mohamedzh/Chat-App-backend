import {
  BaseEntity,
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm"
import { Conversation } from "./Conversation"
import { Message } from "./Message"


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date

  @OneToMany(() => Message, messages => messages.user)
  messages: Message[]

  @ManyToMany(() => Conversation, conversation => conversation.user)
  @JoinTable()
  conversation: Conversation

}


