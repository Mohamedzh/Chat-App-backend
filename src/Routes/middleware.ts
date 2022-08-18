import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../Entities/user";



export const middleware = async (req: Request, res: Response, next: NextFunction) => {

  const { token } = req.headers as { token: string }
  try {

    if (!token) {

      return res.status(404).send("A token is required");
    }
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY!)
    if (!decoded) {
      return res.status(400).send("Invalid token");
    }
    const { email } = jwt.verify(token, process.env.PRIVATE_KEY!) as { email: string }
    const currentUser = await User.findOne({ where: { email }, relations: { messages: true } })
    req.body.user = currentUser
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}