import Router from 'express'
import { Message } from '../Entities/message'
import { middleware } from './middleware'

const router = Router()

//Create a post
router.post('/', middleware, async (req, res) => {
    try {
        const { body, user } = req.body
        const newMessage = Message.create({ body, user: user.id })
        await newMessage.save()
        res.send(newMessage)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get a user's post
router.get('/user', middleware, async (req, res) => {
    try {
        res.send(req.body.user.messages)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get all messages from all users to 1 loggedIn user
router.get('/all', middleware, async (req, res) => {
    try {
        const messages = await Message.find()
        res.send(messages)
    } catch (error) {
        res.status(500).send(error)
    }

})

export default router