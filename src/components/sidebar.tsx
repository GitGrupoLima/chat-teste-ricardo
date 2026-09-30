"use client";

import { useEffect } from "react";
import { ConversationListItem } from "@/components/conversation-list-item";
import type { Conversation } from "@/lib/types";

interface SidebarProps {
  conversations: Conversation[];
  selectedId: string;
  now: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onNewConversation: () => void;
}

export function Sidebar({
  conversations,
  selectedId,
  now,
  isOpen,
  onClose,
  onSelect,
  onNewConversation,
}: SidebarProps) {
  // Fecha a gaveta do celular com a tecla Esc
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Fundo escurecido atrás da gaveta (só no celular) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Conversas"
        className={`fixed inset-y-0 left-0 z-40 flex w-80 max-w-[85vw] flex-col border-r border-slate-200 bg-white transition-[translate,visibility] duration-200 md:visible md:static md:z-auto md:max-w-none md:translate-x-0 ${
          isOpen ? "visible translate-x-0 shadow-xl md:shadow-none" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-teal-600 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
              TimeTrack <span className="font-normal text-teal-700">Suporte</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar conversas"
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-4 pt-4 pb-2">
          <button
            type="button"
            onClick={onNewConversation}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Nova conversa
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          <p className="px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-slate-400 uppercase">
            Conversas recentes
          </p>
          <ul className="space-y-1">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <ConversationListItem
                  conversation={conversation}
                  isSelected={conversation.id === selectedId}
                  now={now}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
