import { Router } from "express";
import { meddleware } from "./meddleware";
import { Message } from "../Entities/message";
import { User } from "../Entities/user";
import { Conversation } from "../Entities/conversation"
import { Chat } from "../Entities/chat";
import { findAncestor } from "typescript";


const router = Router()



router.get("/", async (req, res) => {
    try {
        const conversations = await Conversation.find({ relations: { chats: true } })
        res.send(conversations)
    } catch (error) {
        res.status(500).send(error)
    }
})
//Create a new conversation
router.post('/', async (req, res) => {
    try {
        const userIds = req.body.userIds
        const conversation = Conversation.create()
        await conversation.save()

        for (let i = 0; i < userIds.length; i++) {
            const chat = Chat.create({conversation:conversation, user:userIds[i]})
            await chat.save()
            console.log(chat)
        }
        res.send(conversation)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router