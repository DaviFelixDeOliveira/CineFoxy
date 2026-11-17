---
name: cinefoxy-buttons
description: Especificação técnica, variantes, tamanhos e estados interativos do componente Button no CineFoxy.
---

# CineFoxy — Padrão de Botões (`Button`)

## 1. Visão Geral
O componente `Button` é a unidade básica de ação no CineFoxy. Ele deve apresentar comportamento tátil e visual consistente, com foco nítido para navegação em Smart TVs e áreas confortáveis para toque em celulares.

---

## 2. Variantes Visuais

1. **`primary` (Ação Principal):** Fundo Laranja Fox (`var(--brand-primary)`), texto branco (`var(--brand-contrast)`). Utilizado para iniciar reprodução, ações de destaque e confirmações.
2. **`secondary` (Ação Neutra):** Fundo de superfície elevada (`var(--surface-elevated)`), texto `var(--text-primary)`, borda suave `var(--border-default)`.
3. **`outline` (Secundário com Borda):** Fundo transparente, borda de 1px `var(--border-default)` e texto `var(--text-primary)`. No hover, preenche com `var(--surface-elevated)`.
4. **`ghost` (Discreto):** Fundo transparente e texto `var(--text-primary)`. Utilizado em barras de ferramentas e navegações secundárias.
5. **`destructive` (Ações Críticas):** Fundo vermelho de alerta (`var(--status-error)`), texto branco. Utilizado para remoções ou cancelamentos definitivos.

---

## 3. Escala de Tamanhos

| Tamanho | Altura | Padding Horizontal | Tamanho da Fonte | Alvo Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| `sm` | `32px` | `12px` | `13px` | Badges de ação e listas compactas |
| `md` (Padrão) | `40px` | `16px` | `14px` | Formulários e cabeçalhos |
| `lg` | `48px` | `24px` | `16px` | **Hero banners, players e telas de TV** |

---

## 4. Estados Interativos e Acessibilidade

- **Hover:** Transição suave de cor (`150ms ease-out`), sem transformações bruscas de escala.
- **Focus Visible (`:focus-visible`):** Contorno de `2px solid var(--focus-ring)` com `outline-offset: 2px`. **Obrigatório para navegação por controle remoto na Fire TV e teclado.**
- **Active:** Fundo escurece suavemente (`var(--brand-active)` no primário).
- **Disabled:** Opacidade reduzida para `0.5`, cursor `not-allowed`, eventos de clique bloqueados (`pointer-events: none`).
- **Loading:** Exibe spinner com as dimensões do ícone mantendo o tamanho e alinhamento do botão, com atributo `aria-busy="true"` e texto acessível.

---

## 5. Checklist de Validação
- [ ] O botão suporta as 5 variantes (`primary`, `secondary`, `outline`, `ghost`, `destructive`)?
- [ ] O tamanho `lg` oferece no mínimo 48px de altura para TV e mobile?
- [ ] O estado `:focus-visible` destaca claramente o elemento?
- [ ] O estado `loading` impede cliques múltiplos?
- [ ] As cores consomem estritamente tokens semânticos?

---

## 6. Referências
- `docs/design-system/components.md`
- Skill dependente: `cinefoxy-design-system`
