import { CategoryBadge } from "@/components/category-badge";
import { formatRelativeTime } from "@/lib/relative-time";
import type { Conversation } from "@/lib/types";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  // Nulo até a tela abrir no navegador
  now: number | null;
  onSelect: (id: string) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ConversationListItem({
  conversation,
  isSelected,
  now,
  onSelect,
}: ConversationListItemProps) {
  const lastMessage = conversation.messages.at(-1);
  const lastActivity = lastMessage?.sentAt ?? conversation.createdAt;
  const name = conversation.customerName ?? "Nova conversa";

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      aria-current={isSelected ? "true" : undefined}
      className={`flex w-full gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
        isSelected ? "bg-teal-50 ring-1 ring-inset ring-teal-600/20" : "hover:bg-slate-50"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          conversation.customerName ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-500"
        }`}
      >
        {conversation.customerName ? getInitials(conversation.customerName) : "+"}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-semibold text-slate-900">{name}</span>
          <span className="shrink-0 text-xs text-slate-400">
            {now !== null ? formatRelativeTime(lastActivity, now) : ""}
          </span>
        </span>
        <span className="mt-0.5 block truncate text-sm text-slate-500">
          {lastMessage?.text ?? "Nenhuma mensagem ainda"}
        </span>
        {conversation.category && (
          <span className="mt-1.5 block">
            <CategoryBadge category={conversation.category} />
          </span>
        )}
      </span>
    </button>
  );
}
