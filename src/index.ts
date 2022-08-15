//import express, { json, Router, urlencoded } from 'express';
import express, { json, urlencoded } from "express"
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import userRouter from "./routes/users"
import postRouter from "./routes/messages"
import { AppDataSource } from './data-source';



const app = express()
config()
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));


app.use("/user", userRouter)
app.use("/post", postRouter)


app.get("*", (req, res) => {
  res.status(404).json({
    msg: "Erorr 404"
  })
})

app.listen(process.env.PORT, async () => {
  console.log(`listing on ${process.env.PORT} port`);

  try {
    await AppDataSource.initialize()
    console.log("connected to the database");

  } catch (error) {
    console.log("conection Not Valid");
    console.log(error);
  }
})


