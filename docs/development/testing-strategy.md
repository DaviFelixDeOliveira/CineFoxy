# CineFoxy — Estratégia de Testes Automatizados

## 1. Ferramental
- **Runner:** `Vitest` (integrado nativamente com a configuração do Vite).
- **Ambiente:** `jsdom` simulando a árvore de elementos do navegador.
- **Utilitários:** `@testing-library/react` e `@testing-library/jest-dom` para asserções centradas no comportamento do usuário.

---

## 2. Escopo dos Testes Unitários e de Componentes

### 2.1. O que jsdom Valida com Precisão
- Mudanças de classes e atributos no DOM (ex.: `data-theme="light"`).
- Estados de acessibilidade (`aria-busy`, `aria-hidden`, `role="button"`).
- Disparo de eventos (clique, teclado, foco).
- Comportamento de hooks e persistência em mocks de `localStorage`.
- Resolução de mensagens no catálogo de erros.

### 2.2. O que Requer Validação Visual no Navegador
- Cálculos reais de layout geométrico (ex.: verificar se a proporção 2:3 ou 16:9 é respeitada no pixel). O jsdom não realiza layout engine nem rasterização gráfica.

---

## 3. Comandos de Execução
```bash
npm test            # Executa a suíte de testes completa uma vez
npm run test:watch  # Executa testes em modo contínuo de desenvolvimento
```
