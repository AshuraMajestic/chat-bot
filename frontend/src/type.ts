export type Sender = "USER" | "AI";

export interface Message {
  id: string;
  conversation_id: string;
  sender: Sender;
  text: string;
  createdAt?: string;
}
