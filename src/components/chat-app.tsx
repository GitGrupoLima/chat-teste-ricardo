"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatHeader } from "@/components/chat-header";
import { EmptyState } from "@/components/empty-state";
import { MessageInput } from "@/components/message-input";
import { MessageList } from "@/components/message-list";
import { Sidebar } from "@/components/sidebar";
import { createSampleConversations } from "@/lib/conversas-exemplo";
import type { Conversation, Message } from "@/lib/types";

// Resposta fixa enquanto o chatbot ainda não está ligado ao Claude
const PLACEHOLDER_REPLY = "Ainda estou aprendendo a responder. No Dia 4 eu ganho um cérebro!";
const REPLY_DELAY_MS = 500;
const CLOCK_REFRESH_MS = 30_000;

let idCounter = 0;
function createId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

function getLastActivity(conversation: Conversation): number {
  return conversation.messages.at(-1)?.sentAt ?? conversation.createdAt;
}

export function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    createSampleConversations(Date.now()),
  );
  const [selectedId, setSelectedId] = useState<string>(() => conversations[0]?.id ?? "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Quantas respostas cada conversa ainda está esperando
  const [pendingReplies, setPendingReplies] = useState<Record<string, number>>({});
  // Nulo no servidor; só calculamos "há X min" depois que a tela abre no navegador
  const [now, setNow] = useState<number | null>(null);
  const timersRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), CLOCK_REFRESH_MS);
    return () => window.clearInterval(interval);
  }, []);

  // Cancela respostas agendadas se a tela for desmontada
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const sortedConversations = useMemo(
    () => [...conversations].sort((a, b) => getLastActivity(b) - getLastActivity(a)),
    [conversations],
  );

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ?? sortedConversations[0];

  const appendMessage = useCallback((conversationId: string, message: Message) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, messages: [...conversation.messages, message] }
          : conversation,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !selectedConversation) return;

      const conversationId = selectedConversation.id;
      appendMessage(conversationId, {
        id: createId("msg"),
        role: "user",
        text: trimmed,
        sentAt: Date.now(),
      });
      setPendingReplies((previous) => ({
        ...previous,
        [conversationId]: (previous[conversationId] ?? 0) + 1,
      }));

      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer);
        appendMessage(conversationId, {
          id: createId("msg"),
          role: "assistant",
          text: PLACEHOLDER_REPLY,
          sentAt: Date.now(),
        });
        setPendingReplies((previous) => {
          const next = { ...previous };
          const remaining = (next[conversationId] ?? 1) - 1;
          if (remaining > 0) next[conversationId] = remaining;
          else delete next[conversationId];
          return next;
        });
      }, REPLY_DELAY_MS);
      timersRef.current.add(timer);
    },
    [appendMessage, selectedConversation],
  );

  const handleNewConversation = useCallback(() => {
    // Reaproveita uma conversa nova que ainda está vazia, em vez de criar outra
    const emptyConversation = conversations.find((conversation) => conversation.messages.length === 0);
    if (emptyConversation) {
      setSelectedId(emptyConversation.id);
    } else {
      const conversation: Conversation = {
        id: createId("conv"),
        title: "Nova conversa",
        customerName: null,
        customerEmail: null,
        category: null,
        createdAt: Date.now(),
        messages: [],
      };
      setConversations((previous) => [conversation, ...previous]);
      setSelectedId(conversation.id);
    }
    setIsDrawerOpen(false);
  }, [conversations]);

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedId(id);
    setIsDrawerOpen(false);
  }, []);

  const handleCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const handleOpenDrawer = useCallback(() => setIsDrawerOpen(true), []);

  if (!selectedConversation) return null;

  const isTyping = (pendingReplies[selectedConversation.id] ?? 0) > 0;

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar
        conversations={sortedConversations}
        selectedId={selectedConversation.id}
        now={now}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSelect={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader conversation={selectedConversation} onOpenDrawer={handleOpenDrawer} />

        {selectedConversation.messages.length === 0 ? (
          <EmptyState onSuggestionClick={sendMessage} />
        ) : (
          <MessageList
            key={`messages-${selectedConversation.id}`}
            messages={selectedConversation.messages}
            isTyping={isTyping}
            showTimes={now !== null}
          />
        )}

        <MessageInput key={`input-${selectedConversation.id}`} onSend={sendMessage} />
      </main>
    </div>
  );
}
