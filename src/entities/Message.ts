import {
  BaseEntity,
  Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm"
import { Conversation } from "./Conversation"
import { User } from "./User"


@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  body: string

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date

  @ManyToOne(() => User, user => user.messages)
  user: User

  @ManyToOne(() => Conversation, conversation => conversation.message)
  conversation: Conversation
}

