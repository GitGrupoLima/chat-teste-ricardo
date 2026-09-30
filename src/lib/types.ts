// Categorias aceitas pelo TimeTrack ao abrir chamados (ver docs/timetrack-api.md)
export type Category =
  | "acesso"
  | "dados"
  | "integracao"
  | "duvida"
  | "bug"
  | "feature";

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  // Horário em milissegundos (Date.now())
  sentAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  // Nulos enquanto a conversa é nova e ainda não sabemos quem é a pessoa
  customerName: string | null;
  customerEmail: string | null;
  category: Category | null;
  createdAt: number;
  messages: Message[];
}
