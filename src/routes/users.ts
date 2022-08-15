import Router, { NextFunction, Request, Response } from 'express'
import { User } from '../entities/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { middleware } from './middleware'

const router = Router()
config()
//Post a new user
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const oldUser = await User.findOne({ where: { email } });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
        const newUser = User.create({ firstName, lastName, email: email.toLowerCase(), password: hashedPassword })
        await newUser.save();
        res.send({newUser, token});
    } catch (error) {
        console.log(error);

        res.status(500).send(error)
    }
})
//Get users

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Login to a specific user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const currentUser = await User.findOne({ where: { email } })
        if (!currentUser) { return res.send('User not found, please enter a valid email') }
        const match = await bcrypt.compare(password, currentUser!.password);

        if (match) {
            const token = jwt.sign({ email: currentUser.email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
            res.send({ currentUser, token })
        } else {
            res.status(404).send('wrong password')
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

interface decodedJwt extends jwt.JwtPayload {
    email?: string
}
//re-login using the token created and get user details
router.post('/logintoken', async (req, res) => {
    try {
        const { token } = req.body
        const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        const currentUser = await User.findOne({ where: { email } })
        res.send({currentUser, decoded})
        // let userEmail = decoded.email

        // const email = decoded.email as { email: string }

        // const userEmail = decoded
        // const currentUser = await User.findOne({ where: { email } })
        // if (!currentUser) { return res.send('User not found, please enter a valid email') }
        // const match = await bcrypt.compare(password, currentUser!.password);

    } catch (error) {
        res.status(500).send(error)
    }
})


export default router


