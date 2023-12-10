import Router from "express";
import { User } from "../Entities/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware2 } from "./middleware archive";

const router = Router();

router.get("/", async (req, res) => {
  try {
     /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    */
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
      /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Create a new user'
    #swagger.parameters['firstName', 'lastName', 'email', 'password'] = {
      in: 'body',
    }
    */
    const { firstName, lastName, email, password } = req.body;
    if (password.length < 8) {
      return res.send(" Password should be more than 8 characters");
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const token = jwt.sign({ email }, process.env.PRIVATE_KEY!, {
      expiresIn: "1d",
    });
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
      /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Login'
    #swagger.parameters['email', 'password'] = {
      in: 'body',
    }
    */
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      relations: { messages: true },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      return res.status(500).send("Password invalid");
    }

    const token = jwt.sign({ email: email }, process.env.PRIVATE_KEY!, {
      expiresIn: "1d",
    });
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/signinwithtoken", middleware2, async (req, res) => {
  try {
     /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Verify logged-in user's token'
    */
    const { user } = req.body;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
