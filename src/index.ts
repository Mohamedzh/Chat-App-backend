import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import { AppDataSource } from './data-source';
import userRouter from './Routes/users'
import messageRouter from './Routes/messages'
import conversationRouter from "./Routes/conversations"
import * as http from 'http';
import { Server } from 'socket.io';
const app = express()

const server = http.createServer(app)
server.listen(3131, () => {
  console.log('server is listening on port 3131')
})
const io = new Server(server,
  {
    cors: {
      origin: ['http://localhost:3000'],
      allowedHeaders: ["my-custom-header"],
    }
  }
)

io.on('connection', socket => {
  console.log(`new connection with socket`)
  socket.on('newMessage', (args) =>
    socket.broadcast.emit('sendMessage', { ...args, createdAt: Date.now() }))

  // socket.to("room 1").emit("roomMessage", socket)

})



config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));



app.use("/user", userRouter)
app.use("/messages", messageRouter)
app.use("/conversations", conversationRouter)



app.get("*", (req, res) => {
  res.status(404).json({
    msg: "Erorr 404"
  })
})





app.listen(process.env.PORT, async () => {
  console.log(`listening on port ${process.env.PORT} `);

  try {
    await AppDataSource.initialize(),
      console.log('DB connection established')
  } catch (error) {
    throw new Error(`error occured ${error as Error}`)
  }
})



