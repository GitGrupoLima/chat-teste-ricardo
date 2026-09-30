import type { Category } from "@/lib/types";

interface CategoryStyle {
  label: string;
  className: string;
}

// Classes escritas por extenso para o Tailwind encontrá-las no código
export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  acesso: {
    label: "Acesso",
    className: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/25",
  },
  dados: {
    label: "Dados",
    className: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/25",
  },
  integracao: {
    label: "Integração",
    className: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/25",
  },
  duvida: {
    label: "Dúvida",
    className: "bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-300 dark:ring-slate-400/25",
  },
  bug: {
    label: "Bug",
    className: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/25",
  },
  feature: {
    label: "Feature",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/25",
  },
};
