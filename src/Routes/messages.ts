import { Router } from "express";
import { middleware2 } from "./middleware archive";
import { Message } from "../Entities/message";
import { User } from "../Entities/user";



const router = Router()



router.post("/", async (req, res) => {
  try {
    const { userName, body } = req.body
    const currentUser = await User.findOne({ where: { firstName: userName } })
    const message = Message.create({ body, user: currentUser! })
    await message.save()
    res.send(currentUser)
  } catch (error) {
    res.status(500).send(error)
  }
})


router.get("/all", async (req, res) => {
  try {
    const messages = await Message.find({relations:{user:true}})
    res.send(messages)

  } catch (error) {
    res.status(500).send(error)
  }
})


router.post("/usermessages", middleware2, (req, res) => {
  try {

    res.send(req.body.user.messages)

  } catch (error) {
    res.status(500).send(error)
  }
})


export default router