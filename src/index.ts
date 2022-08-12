import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import AppDataSource from './data-source';
import userRouter from './Routes/users'
import postRouter from './Routes/posts'



const app = express()

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/user', userRouter)
app.use('/post', postRouter)


app.listen(process.env.port, async ()=>{
    console.log(`listening on port ${process.env.port}`)
    try {
        await AppDataSource.initialize(),
        console.log('DB connection established')
    } catch (error) {
        throw new Error(`error occured ${error as Error}`)
    }
} )