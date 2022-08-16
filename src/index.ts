import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import userRouter from './Routes/users'
import messageRouter from './Routes/messages'
import http from "http";
import { Server } from "socket.io";


const app = express()



config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));



app.use("/user", userRouter)
app.use("/messages", messageRouter)




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




////////////////////////////////////////////////////////////////////////////////////






const server = http.createServer(app)
server.listen(3131, () => {
  console.log("server is running");

})


const io = new Server(server, {
  cors: {
    origin: "*"
  }
})


io.on("connection", (socket) => {
  console.log("userconnected");

  socket.on("newMessage", (arg) => {
    console.log(arg);

    socket.emit("userMessage", arg)
  })

  // socket.on("connection", (...arg) => {
  //   console.log(arg);

  // })

  socket.on("disconnect", () => {
    console.log("user disconnected");

  })


})
