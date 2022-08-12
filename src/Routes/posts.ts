import Router from 'express'
import { Post } from '../Entities/post'
import { middleware } from './middleware'

const router = Router()

//Create a post
router.post('/', middleware, async (req, res) => {
    try {
        const { title, body, user } = req.body
        const newPost = Post.create({ title, body, user: user.id })
        await newPost.save()
        res.send(newPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get a user's post
router.post('/user', middleware, async (req, res) => {
    try {
        res.send(req.body.user.posts)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get all posts from all users to 1 loggedIn user
router.post('/all', middleware, async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        res.status(500).send(error)
    }

})

export default router