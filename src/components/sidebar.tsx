"use client";

import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ConversationListItem } from "@/components/conversation-list-item";
import { filterConversations } from "@/lib/search-conversations";
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
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;
  const visibleConversations = useMemo(
    () => filterConversations(conversations, query),
    [conversations, query],
  );

  function handleNewConversation() {
    // Limpa a busca para a conversa nova aparecer na lista
    setQuery("");
    onNewConversation();
  }

  function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    // Esc limpa a busca antes de fechar a gaveta
    if (event.key === "Escape" && query) {
      event.stopPropagation();
      setQuery("");
    }
  }

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
            onClick={handleNewConversation}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Nova conversa
          </button>
        </div>

        <div className="px-4 pt-2">
          <div className="relative">
            <label htmlFor="conversation-search" className="sr-only">
              Buscar atendimentos
            </label>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              id="conversation-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar atendimentos"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-9 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          <p
            className="px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-slate-400 uppercase"
            aria-live="polite"
          >
            {isSearching
              ? `${visibleConversations.length} ${visibleConversations.length === 1 ? "resultado" : "resultados"}`
              : "Conversas recentes"}
          </p>
          {isSearching && visibleConversations.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              Nenhum atendimento encontrado para “{query.trim()}”.
            </p>
          )}
          <ul className="space-y-1">
            {visibleConversations.map((conversation) => (
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
