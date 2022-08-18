import Router from "express";
import { User } from "../Entities/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { middleware2 } from "./middleware archive"


const router = Router()

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)

  } catch (error) {
    res.send(error)
  }
})

//create new user

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    if (password.length < 8) {
      return res.send(" Password should be more than 8 characters")
    }
    const hashedPassword = await bcrypt.hash(password, 15)
    const token = jwt.sign({ email: email }, process.env.PRIVAT_KEY!, { expiresIn: '1d' })
    const user = User.create({ firstName, lastName, email, password: hashedPassword })
    await user.save()
    res.send({ user, token })
  } catch (error) {
    res.status(500).send(error)
  }
})


//signin With bcrypt
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email }, relations: { messages: true } })
    if (!user) {
      return res.send("User not found")
    }

    const compareResult = await bcrypt.compare(password, user.password)
    if (!compareResult) {
      return res.send("Password invalid")
    }

    const token = jwt.sign({ email: email }, process.env.PRIVATE_KEY!, { expiresIn: '1d' })
    res.send({ user, token })

    console.log(token);

  } catch (error) {
    res.status(500).send(error)
  }
})


//user already loggedIn and using the same token from local storage
router.get("/signinwithtoken", middleware2, async (req, res) => {
  try {
    // const { token } = req.body
    // const { email } = jwt.verify(token, process.env.PRIVATE_KEY!) as {
    //   email: string
    // }
    // const user = await User.findOne({ where: { email }, relations: { messages: true } })
    const {user} = req.body
    console.log(user);
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router