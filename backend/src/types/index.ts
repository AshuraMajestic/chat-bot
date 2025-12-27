export enum Sender {
  USER = 'USER',
  AI = 'AI'
}

export interface Conversation {
  id: string;
  created_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: Sender;
  text: string;
  created_at?: string;
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}

export interface SendMessageRequest {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  sessionId: string;
  reply: string;
}