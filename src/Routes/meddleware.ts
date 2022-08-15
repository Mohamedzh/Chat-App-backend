import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User } from "../Entities/user";

export const meddleware = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const { token } = req.body

    if (token) {

      const righToken = Jwt.verify(token, process.env.PRIVAT_KEY!)

      if (righToken) {
        const { email } = righToken as { email: string }

        console.log(email);


        const user = await User.findOne({
          where: { email }, relations: { messages: true }
        })


        req.body.user = user


      } else {
        return res.status(500).send("Token invalid")
      }
    } else {
      return res.status(500).send("Token not found")
    }
    next()

  } catch (error) {

    res.status(500).send(error)
  }




}




//const { user } = req.body  can not be destructure because already decleared in line 10


