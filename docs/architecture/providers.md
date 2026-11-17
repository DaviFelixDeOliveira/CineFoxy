# CineFoxy — Arquitetura de Provedores de Contexto

## 1. Visão Geral
O CineFoxy adota uma arquitetura enxuta e consciente na árvore de contextos do React. Evitamos a criação indiscriminada de provedores globais quando a responsabilidade pode ser resolvida de maneira local nos componentes.

---

## 2. Provedores Implementados na Fase 1

### 2.1. `ThemeProvider` (`src/app/providers/ThemeProvider.tsx`)
- **Responsabilidade:** Gerenciar a alternância entre os três modos de tema: `light`, `dark` e `system`.
- **Valores Expostos:**
  - `theme`: Modo selecionado pelo usuário (`ThemeMode: 'light' | 'dark' | 'system'`).
  - `resolvedTheme`: Tema efetivamente aplicado no DOM (`'light' | 'dark'`).
  - `setTheme(mode: ThemeMode)`: Função para alterar a preferência.
- **Persistência:** Escrita no `localStorage` sob a chave `cinefoxy_theme` com fallback em memória.
- **Sincronização:** Ouvinte de evento no `window.matchMedia('(prefers-color-scheme: dark)')`.

---

## 3. Decisão Arquitetural: Ausência de `ErrorProvider`
No planejamento inicial foi avaliada a criação de um `ErrorProvider` global. No entanto, optou-se por **não criar** um contexto global de erros na Fase 1, pelos seguintes motivos técnicos:
1. Erros de carregamento de listas e cards são locais a cada componente e devem exibir o componente `ErrorState` no local exato da falha, sem travar o restante da tela.
2. Erros de navegação e rotas quebradas são tratados nativamente pelo `errorElement` do React Router.
3. Isso evita renderizações desnecessárias em toda a árvore de componentes da aplicação.
