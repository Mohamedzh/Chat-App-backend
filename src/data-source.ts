import { DataSource } from "typeorm";
import "reflect-metadata"
import { config } from "dotenv";
import { User } from "./Entities/user";
import { Message } from "./Entities/message";
import { Conversation } from "./Entities/conversation";
import { Chat } from "./Entities/chat";




config()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.postgres,
  password: process.env.PGPASSWORD,
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Message, Conversation, Chat],
  migrations: ["migrations/*.ts"],
  subscribers: [],

});
