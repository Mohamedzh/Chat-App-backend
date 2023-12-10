import { Router } from "express";
import { middleware2 } from "./middleware archive";
import { Message } from "../Entities/message";
import { User } from "../Entities/user";

const router = Router();

  
router.post("/", async (req, res) => {
  try {
    /*
    #swagger.tags = ['Messages']
    #swagger.summary = 'Post a new message'
    #swagger.parameters['id', 'body', 'conversation'] = {
      in: 'body',
    }
    */
    const { id, body, conversation } = req.body;
    const currentUser = await User.findOne({ where: { id } });
    const message = Message.create({ body, user: currentUser!, conversation });
    await message.save();
    res.send(currentUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

  
router.get("/all", async (req, res) => {
  try {
    /*
    #swagger.tags = ['Messages']
    #swagger.summary = 'Get all messages'
    */
    const messages = await Message.find({
      where: { conversation: { id: 0 } },
      relations: { user: true },
    });
    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/usermessages", middleware2, (req, res) => {
  try {
    /*
    #swagger.tags = ['Messages']
    */
    res.send(req.body.user.messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
