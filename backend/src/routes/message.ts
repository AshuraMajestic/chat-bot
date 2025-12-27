import { Router } from 'express';
import { MessageModel } from '../models/Message';
import { Sender } from '../types';

const messageRouter = Router();

// Create a new message
messageRouter.post('/', (req, res) => {
  try {
    const { conversation_id, sender, text } = req.body;
    
    // Validate sender
    if (sender !== Sender.USER && sender !== Sender.AI) {
      return res.status(400).json({ error: 'Invalid sender. Must be USER or AI' });
    }

    const message = MessageModel.create({ conversation_id, sender, text });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create message' });
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

// Update message text
messageRouter.put('/:id', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  const updated = MessageModel.update(req.params.id, text);
  if (!updated) {
    return res.status(404).json({ error: 'Message not found' });
  }
  res.json({ message: 'Message updated successfully' });
});

// Delete message
messageRouter.delete('/:id', (req, res) => {
  const deleted = MessageModel.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Message not found' });
  }
  res.json({ message: 'Message deleted successfully' });
});

export default messageRouter;