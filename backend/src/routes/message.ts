import { Router } from 'express';
import { MessageModel } from '../models/Message';
import { Message, Sender } from '../types';
import { generateAIReply } from '../services/ai';

const messageRouter = Router();

// Create a new message
messageRouter.post("/", async (req, res) => {
  try {
    const { conversation_id, sender, text } = req.body;

    if (!conversation_id || !text) {
      return res.status(400).json({ error: "conversation_id and text are required" });
    }

    if (sender !== Sender.USER) {
      return res.status(400).json({
        error: "Only USER messages are allowed to initiate a conversation",
      });
    }

    // 1️⃣ Save USER message
    const userMessage = MessageModel.create({
      conversation_id,
      sender: Sender.USER,
      text,
    });

    // 2️⃣ Fetch conversation history (AFTER saving user message)
    const history: Message[] =
      MessageModel.findByConversationId(conversation_id);

    // 3️⃣ Generate AI reply using history + current message
    const aiText = await generateAIReply(history, text);

    // 4️⃣ Save AI message
    const aiMessage = MessageModel.create({
      conversation_id,
      sender: Sender.AI,
      text: aiText,
    });

    // 5️⃣ Return both messages
    res.status(201).json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.error("Message processing failed:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// Get all messages
messageRouter.get('/', (req, res) => {
  const messages = MessageModel.findAll();
  res.json(messages);
});

// Get message by ID
messageRouter.get('/:id', (req, res) => {
  const message = MessageModel.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  res.json(message);
});

// Get messages by conversation ID
messageRouter.get('/conversation/:conversationId', (req, res) => {
  const messages = MessageModel.findByConversationId(req.params.conversationId);
  res.json(messages);
});

export default messageRouter;