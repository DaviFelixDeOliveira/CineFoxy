# CineFoxy — Padrões de Código e Diretrizes de Engenharia

## 1. Princípios Gerais
- **TypeScript Estrito:** Todo arquivo TypeScript deve respeitar as regras estritas do `tsconfig.app.json` (`strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`). Proibido o uso do tipo `any` sem justificativa formal.
- **Componentes Funcionais:** Uso exclusivo de componentes funcionais com hooks nativos do React.
- **CSS Modules:** Todo componente visual possui seu arquivo `.module.css` adjacente no mesmo diretório. Proibido o uso de classes CSS globais para estilização interna de componentes.
- **Path Aliases:** Todas as importações de módulos internos utilizam o alias `@/` (ex: `import { Button } from '@/components/ui/Button'`).

---

## 2. Convenções de Nomenclatura
- Componentes React: `PascalCase` (ex: `MediaCard.tsx`, `Button.tsx`).
- Módulos de estilo: `PascalCase.module.css` (ex: `MediaCard.module.css`).
- Utilitários, hooks e serviços: `camelCase` (ex: `themeStorage.ts`, `useTheme.ts`, `errorCatalog.ts`).
- Tipos e Interfaces: `PascalCase` (ex: `MediaItem`, `ThemeMode`).
