"use client";

import { useEffect, useRef } from "react";
import { AssistantAvatar, MessageBubble } from "@/components/message-bubble";
import { formatClockTime } from "@/lib/relative-time";
import type { Message } from "@/lib/types";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  showTimes: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" role="status" aria-label="Atendente digitando">
      <AssistantAvatar />
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
        <span className="size-2 animate-bounce rounded-full bg-slate-400" />
        <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function MessageList({ messages, isTyping, showTimes }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mantém a última mensagem sempre visível
  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 md:px-6" aria-live="polite">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            text={message.text}
            time={showTimes ? formatClockTime(message.sentAt) : null}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
}
