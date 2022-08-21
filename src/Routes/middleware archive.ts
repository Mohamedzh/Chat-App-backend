import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { User } from "../Entities/user";


export const middleware2 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers as { token: string }

    if (token) {

      const rightToken = Jwt.verify(token, process.env.PRIVATE_KEY!)

      if (rightToken) {
        const { email } = rightToken as { email: string }

        console.log(email);


        const user = await User.findOne({
          where: { email }, relations: {conversations:true}
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


