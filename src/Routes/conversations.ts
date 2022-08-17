import { Router } from "express";
import { meddleware } from "./meddleware";
import { Message } from "../Entities/message";
import { User } from "../Entities/user";
import { Conversation } from "../Entities/conversation"
import { Chat } from "../Entities/chat";


const router = Router()


//Create a new conversation
router.post('/', async (req, res) => {
    try {
        const userIds = req.body.userIds
        const conversation = Conversation.create()
        await conversation.save()

        let conversationId = conversation.id
        for (let i = 0; i < userIds.length; i++) {
            const chat = Chat.create({conversationId, userId:userIds[i]})
            await chat.save()
            console.log(chat)
        }
        res.send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router