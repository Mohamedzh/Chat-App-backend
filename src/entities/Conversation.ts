import {
  BaseEntity,
  Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm"
import { User } from "./user"
import { Message } from "./message"


@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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

  @ManyToMany(() => User, user => user.conversations)
  users: User[]

  @OneToMany(() => Message, message => message.conversation)
  message: Message
}

