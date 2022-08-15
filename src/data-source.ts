import { DataSource } from "typeorm";
import "reflect-metadata"
import { config } from "dotenv";
import { User } from "./entities/user";
import { Message } from "./entities/Message";
import { Conversation } from "./entities/Conversation";




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
  entities: [User, Message, Conversation],
  migrations: ["migrations/*.ts"],
  subscribers: [],


});
