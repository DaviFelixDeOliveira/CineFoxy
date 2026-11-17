---
name: cinefoxy-testing
description: Estratégia de testes automatizados com Vitest e Testing Library, validação de temas, acessibilidade e isolamento no CineFoxy.
---

# CineFoxy — Padrões e Estratégia de Testes

## 1. Visão Geral
A qualidade e estabilidade do CineFoxy são garantidas através de testes automatizados usando **Vitest** e **React Testing Library**. Todo avanço de fase depende de 100% de aprovação na suíte de testes (`npm test`).

---

## 2. Princípios de Teste com jsdom

1. **Escopo Real do jsdom:** O ambiente `jsdom` é ideal para validar **estrutura, estados, atributos HTML, classes, acessibilidade e comportamento de eventos**.
2. **Limitações de Layout:** `jsdom` **não** calcula renderização gráfica, tamanhos reais de pixel ou proporções visuais de tela. A validação geométrica estrita (2:3 e 16:9) deve ser inspecionada visualmente no navegador ou via classes CSS declaradas.
3. **Mocks Obrigatórios:**
   - `window.matchMedia`: Deve ser mockado para simular alternância entre claro e escuro.
   - `localStorage`: Deve suportar simulação de quota bloqueada ou lançamento de exceções para garantir a resiliência do `themeStorage`.

---

## 3. Cobertura Obrigatória da Fundação (Fase 1)

1. **`theme.test.tsx`:**
   - Renderização no tema padrão (escuro).
   - Alternância para claro e sistema.
   - Reação ao evento de alteração do `matchMedia`.
   - Recuperação elegante quando `localStorage` falhar.
2. **`button.test.tsx`:**
   - Renderização correta de variantes (`primary`, `secondary`, etc.) e tamanhos (`sm`, `md`, `lg`).
   - Bloqueio de cliques e atributos acessíveis quando `disabled` ou `loading`.
3. **`cards.test.tsx`:**
   - Validação da estrutura de `MediaCard` (classes de proporção 2:3, metadados, títulos truncados).
   - Validação de `ChannelCard` (classes de proporção 16:9, indicador AO VIVO).
4. **`errorCatalog.test.ts`:**
   - Mapeamento de status HTTP 400 a 504 para mensagens em português amigáveis.

---

## 4. Checklist de Validação
- [ ] O comando `npm test` executa todos os testes com saída limpa?
- [ ] Nenhum mock vaza estado para outros arquivos de teste (`afterEach(vi.clearAllMocks)`)?
- [ ] As asserções utilizam seletores acessíveis (`getByRole`, `getByText`) em vez de seletores CSS frágeis?

---

## 5. Referências
- `docs/development/testing-strategy.md`
