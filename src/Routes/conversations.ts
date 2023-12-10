import { Router } from "express";
import { middleware2 } from "./middleware archive";
import { User } from "../Entities/user";
import { Conversation } from "../Entities/conversation";
import { In } from "typeorm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    /*
    #swagger.tags = ['Conversations']
    #swagger.summary = 'Get all conversations'
    */
    const conversations = await Conversation.find({
      relations: { messages: { user: true }, users: true },
    });
    res.send(conversations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", middleware2, async (req, res) => {
  try {
     /*
    #swagger.tags = ['Conversations']
    #swagger.summary = 'Post a new conversation'
    #swagger.parameters['userIds', 'title', 'user'] = {
        in: 'body',
    }
    */
    const { userIds, title, user } = req.body;
    const users = await User.find({ where: { id: In([...userIds, user.id]) } });
    const conversation = Conversation.create({ title, users });
    await conversation.save();

    const conversationId = conversation.id;
    res.send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
     /*
    #swagger.tags = ['Conversations']
    #swagger.summary = 'Get a conversation by id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'The id of the conversation' 
    }
    */
    const conversationId = +req.params.id;
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
      relations: { users: true, messages: { user: true } },
    });
    res.send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
