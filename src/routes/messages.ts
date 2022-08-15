import { Router } from "express";
import { meddleware } from "./meddleware";
import { Message } from "../Entities/message";



const router = Router()



router.post("/", meddleware, async (req, res) => {
  try {
    const { user, body } = req.body
    const message = Message.create({ body, user })
    await message.save()
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})


router.post("allmessage", meddleware, async (req, res) => {
  try {
    const messages = await Message.find()
    res.send(messages)

  } catch (error) {
    res.status(500).send(error)
  }
})


router.post("/usermessages", meddleware, (req, res) => {
  try {

    res.send(req.body.user.messages)

  } catch (error) {
    res.status(500).send(error)
  }
})


export default router