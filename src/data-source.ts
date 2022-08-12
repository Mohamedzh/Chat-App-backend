import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Post } from "./Entities/post";
import { User } from "./Entities/user";

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
    entities: [User, Post],
    migrations: ["migration/*.ts"],
    subscribers: [],
})

export default AppDataSource;