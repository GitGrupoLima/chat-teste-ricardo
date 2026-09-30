import { CategoryBadge } from "@/components/category-badge";
import type { Conversation } from "@/lib/types";

interface ChatHeaderProps {
  conversation: Conversation;
  onOpenDrawer: () => void;
}

export function ChatHeader({ conversation, onOpenDrawer }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label="Abrir conversas"
        className="-ml-1 rounded-md p-1.5 text-xl leading-none text-slate-600 hover:bg-slate-100 md:hidden"
      >
        ☰
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-base font-semibold text-slate-900">{conversation.title}</h1>
          {conversation.category && <CategoryBadge category={conversation.category} />}
        </div>
        {conversation.customerName && (
          <p className="truncate text-sm text-slate-500">
            {conversation.customerName}
            {conversation.customerEmail && (
              <span className="text-slate-400"> · {conversation.customerEmail}</span>
            )}
          </p>
        )}
      </div>
    </header>
  );
}
