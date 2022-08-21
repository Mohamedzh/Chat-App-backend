import { Router } from "express";
import { middleware2 } from "./middleware archive";
import { Message } from "../Entities/message";
import { User } from "../Entities/user";
import { Conversation } from "../Entities/conversation"
import { In } from "typeorm";

const router = Router()



// get all conversations

router.get("/", async (req, res) => {
    try {
        const conversations = await Conversation.find({ relations: { messages: { user: true }, users:true } })
        res.send(conversations)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Create a new conversation
router.post('/', middleware2, async (req, res) => {
    try {
        const { userIds, title, user } = req.body
        const users = await User.find({ where: { id: In([...userIds, user.id]) } })
        const conversation = Conversation.create({ title, users })
        await conversation.save()

        const conversationId = conversation.id
        res.send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get conversation by id
router.get('/:id', async (req, res) => {
    try {
        const conversationId = +req.params.id
        const conversation = await Conversation.findOne({ where: { id: conversationId }, relations: { users: true, messages: true } })
        res.send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router