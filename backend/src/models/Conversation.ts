import { db } from '../database/connection';
import { Conversation, ConversationWithMessages, Message } from '../types';
import { randomUUID } from 'crypto';

export class ConversationModel {
  static create(): Conversation {
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO conversations (id) VALUES (?)');
    stmt.run(id);
    return { id };
  }

  static findById(id: string): Conversation | undefined {
    const stmt = db.prepare('SELECT * FROM conversations WHERE id = ?');
    return stmt.get(id) as Conversation | undefined;
  }

  static findAll(): Conversation[] {
    const stmt = db.prepare('SELECT * FROM conversations ORDER BY created_at DESC');
    return stmt.all() as Conversation[];
  }

  static findByIdWithMessages(id: string): ConversationWithMessages | undefined {
    const conversation = this.findById(id);
    if (!conversation) return undefined;

    const stmt = db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC');
    const messages = stmt.all(id) as Message[];

    return {
      ...conversation,
      messages
    };
  }

  static delete(id: string): boolean {
    const stmt = db.prepare('DELETE FROM conversations WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}