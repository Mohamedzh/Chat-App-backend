import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import userRouter from './Routes/users'
import messageRouter from './Routes/messages'


const app = express()

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));


app.use("/user", userRouter)
app.use("/post", messageRouter)


app.get("*", (req, res) => {
  res.status(404).json({
    msg: "Erorr 404"
  })
})

app.listen(process.env.PORT, async () => {
  console.log(`listing on ${process.env.PORT} port`);

  try {
    await AppDataSource.initialize(),
      console.log('DB connection established')
  } catch (error) {
    throw new Error(`error occured ${error as Error}`)
  }
})


