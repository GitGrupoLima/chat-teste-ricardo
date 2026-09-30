export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "timetrack-theme";

// Roda antes da tela aparecer, para não piscar branco quando o modo escuro está salvo.
// Sem escolha salva, segue o modo do sistema.
export const THEME_INIT_SCRIPT = `(function () {
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    var dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (error) {}
})();`;

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Navegação anônima ou armazenamento bloqueado: o modo vale só até recarregar
  }
}
