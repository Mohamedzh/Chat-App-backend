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
import { User } from './Entities/user';
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
    io.emit('sendMessage', { ...args, createdAt: Date.now() }))
  socket.on('join', (room) => {
    console.log(`joined room ${room}`)
    socket.join(room.toString());
  })
  socket.on('aMessage', async (args) => {
    for (let i = 0; i < args.userIds.length; i++) {
      console.log(args.body)
      io.to(args.userIds[i].toString())
        .emit('aMessage', { user: { firstName: args.firstName }, body: args.body, createdAt: Date.now() }
        )
    }
  })
  //send 'typing' to all other users on main chat
  socket.on('typing', (text)=>{
    socket.broadcast.emit('typing', text)
  })
  //send 'user joined' to other users in the conversation
  socket.on('userJoin', (text)=>{
    for (let i = 0; i < text.ids.length; i++) {
    io.to(text.ids[i].toString()).emit('joinMsg',text.data)
    }
  })
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



