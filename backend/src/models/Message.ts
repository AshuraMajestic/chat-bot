import { db } from '../database/connection';
import { Message, Sender } from '../types';
import { randomUUID } from 'crypto';

export class MessageModel {
  static create(message: Omit<Message, 'id' | 'created_at'>): Message {
    const id = randomUUID();
    const stmt = db.prepare(
      'INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)'
    );
    stmt.run(id, message.conversation_id, message.sender, message.text);
    
    return {
      id,
      ...message
    };
  }

  static findById(id: string): Message | undefined {
    const stmt = db.prepare('SELECT * FROM messages WHERE id = ?');
    return stmt.get(id) as Message | undefined;
  }

  static findByConversationId(conversationId: string): Message[] {
    const stmt = db.prepare(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC'
    );
    return stmt.all(conversationId) as Message[];
  }

  static findAll(): Message[] {
    const stmt = db.prepare('SELECT * FROM messages ORDER BY created_at DESC');
    return stmt.all() as Message[];
  }

  static update(id: string, text: string): boolean {
    const stmt = db.prepare('UPDATE messages SET text = ? WHERE id = ?');
    const result = stmt.run(text, id);
    return result.changes > 0;
  }

  static delete(id: string): boolean {
    const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}