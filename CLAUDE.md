# Chatbot de suporte do TimeTrack

Chatbot de suporte do TimeTrack (sistema fictício de controle de ponto), feito no curso
Desenvolvimento Web com Claude.

Converse com o usuário sempre em português do Brasil.

## Stack

- Next.js 15 (App Router), código em `src/`.
- TypeScript estrito (`"strict": true` no `tsconfig.json`). Nunca use `any`.
- Tailwind CSS puro. Não use bibliotecas de componentes (shadcn/ui, MUI, Chakra etc.).
- A tela tem modo claro e escuro (classe `dark` no `<html>`). Todo componente novo precisa das
  classes `dark:` correspondentes.

## Idiomas

- Textos da tela: português do Brasil.
- Código (variáveis, funções, tipos, arquivos): inglês.
- Comentários: português.

## TimeTrack e Claude

- O TimeTrack é um sistema EXTERNO, documentado em `docs/timetrack-api.md`.
- Sempre leia `docs/timetrack-api.md` antes de programar qualquer coisa ligada ao TimeTrack
  ou ao Claude.

## Segurança

- Nunca coloque chaves, senhas ou tokens no código. Use variáveis de ambiente
  (`.env.local`, que já é ignorado pelo Git).

## Git

- Ao terminar uma tarefa e o `npm run build` passar, faça o commit e envie direto para a `main`
  também (além da branch de trabalho), sem perguntar.
