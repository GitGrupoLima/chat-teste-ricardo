import { CATEGORY_STYLES } from "@/lib/categories";
import type { Conversation } from "@/lib/types";

// Tira acentos e deixa tudo minúsculo, para "joao" achar "João"
export function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Junta tudo o que pode ser buscado: nome, email, título, categoria e mensagens
function getSearchableText(conversation: Conversation): string {
  const parts = [
    conversation.title,
    conversation.customerName ?? "",
    conversation.customerEmail ?? "",
    conversation.category ? CATEGORY_STYLES[conversation.category].label : "",
    ...conversation.messages.map((message) => message.text),
  ];
  return normalizeText(parts.join(" "));
}

// Cada palavra digitada precisa aparecer em algum lugar da conversa
export function filterConversations(conversations: Conversation[], query: string): Conversation[] {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return conversations;

  return conversations.filter((conversation) => {
    const searchableText = getSearchableText(conversation);
    return terms.every((term) => searchableText.includes(term));
  });
}
