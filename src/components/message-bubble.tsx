import type { MessageRole } from "@/lib/types";

interface MessageBubbleProps {
  role: MessageRole;
  text: string;
  // Nulo até a tela abrir no navegador
  time: string | null;
}

export function AssistantAvatar() {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white"
    >
      TT
    </span>
  );
}

export function MessageBubble({ role, text, time }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <AssistantAvatar />}

      <div className={`flex max-w-[80%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <span className="sr-only">{isUser ? "Você disse:" : "Atendente disse:"}</span>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap shadow-sm ${
            isUser
              ? "rounded-br-md bg-teal-600 text-white"
              : "rounded-bl-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          }`}
        >
          {text}
        </div>
        {time && <span className="mt-1 px-1 text-xs text-slate-400 dark:text-slate-500">{time}</span>}
      </div>
    </div>
  );
}
