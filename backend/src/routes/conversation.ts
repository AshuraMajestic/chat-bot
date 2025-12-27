import { Router } from 'express';
import { ConversationModel } from '../models/Conversation';

const conversationRouter = Router();

// Create a new conversation
conversationRouter.post('/', (req, res) => {
  try {
    const conversation = ConversationModel.create();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create conversation' });
  }
});

// Get all conversations
conversationRouter.get('/', (req, res) => {
  const conversations = ConversationModel.findAll();
  res.json(conversations);
});

// Get conversation by ID
conversationRouter.get('/:id', (req, res) => {
  const conversation = ConversationModel.findById(req.params.id);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json(conversation);
});

// Get conversation with all messages
conversationRouter.get('/:id/messages', (req, res) => {
  const conversation = ConversationModel.findByIdWithMessages(req.params.id);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json(conversation);
});

// Delete conversation
conversationRouter.delete('/:id', (req, res) => {
  const deleted = ConversationModel.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  res.json({ message: 'Conversation deleted successfully' });
});

export default conversationRouter;