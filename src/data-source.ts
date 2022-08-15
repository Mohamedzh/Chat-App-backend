import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Message } from "./Entities/message";
import { User } from "./Entities/user";
import { Conversation } from "./Entities/conversation";

config()
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.pghost,
    port: Number(process.env.pgport),
    username: process.env.pguser,
    password: process.env.pgpassword,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [User, Message, Conversation],
    migrations: ["migration/*.ts"],
    subscribers: [],
})

export default AppDataSource;