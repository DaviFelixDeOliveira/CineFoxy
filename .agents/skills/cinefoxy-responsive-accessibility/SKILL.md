---
name: cinefoxy-responsive-accessibility
description: Diretrizes de acessibilidade WCAG AA, navegação por teclado, adaptação para Amazon Fire TV e dispositivos móveis.
---

# CineFoxy — Responsividade e Acessibilidade (TV, Mobile e Desktop)

## 1. Visão Geral
O CineFoxy atende a três paradigmas distintos de interação:
1. **Desktop:** Teclado e mouse de alta precisão.
2. **Mobile:** Toque direto com áreas táteis confortáveis.
3. **Smart TV / Fire TV:** Navegação espacial exclusivamente por setas direcionais (D-Pad), botão Enter/OK e tecla Voltar (Back/Escape), sem ponteiro de mouse.

---

## 2. Diretrizes Específicas por Dispositivo

### 2.1. Amazon Fire TV e Navegadores de Televisão
- **Foco Visível Obrigatório:** O elemento ativo deve exibir contorno nítido de `2px` a `3px` em Laranja Fox (`var(--focus-ring)`) com deslocamento (`outline-offset: 2px`).
- **Navegação com Teclas Direcionais:** A ordem dos elementos no DOM deve permitir que as teclas `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` e `Tab` percorram a tela de forma previsível e sem armadilhas de foco.
- **Tamanho de Fontes em TV:** Como a tela é visualizada a 2 ou 3 metros de distância, títulos e rótulos principais devem possuir tamanhos ampliados (mínimo 16px para texto secundário e 18px para botões).
- **Desempenho em Hardware Modesto:** Evitar sombras excessivas ou filtros CSS pesados durante rolagem contínua.

### 2.2. Dispositivos Móveis (Android / iOS)
- **Áreas de Toque:** Todo botão, link ou card clicável deve ter dimensões mínimas de **44px x 44px**.
- **Adaptação de Grid:** Redução de colunas de cartazes (máximo 2 a 3 colunas em telas de celular) para garantir legibilidade dos pôsteres.

### 2.3. Desktop
- Estados de hover informativos e transições suaves.
- Suporte a atalhos de teclado (ex.: `/` para focar na pesquisa, `Esc` para fechar modais).

---

## 3. Acessibilidade Semântica (WCAG AA)
1. **Contraste Mínimo:** 4.5:1 para texto normal e 3:1 para textos grandes e componentes de interface.
2. **Semântica de Elementos:** Utilize `<button>`, `<nav>`, `<header>`, `<main>`, `<section>` e `<footer>`. Não substitua botões por `<div>` clicáveis sem `tabIndex` e `role="button"`.
3. **Preferência de Movimento:** Respeite rigorosamente `@media (prefers-reduced-motion: reduce)`, desativando animações pulsantes ou saltos de layout.

---

## 4. Checklist de Validação
- [ ] É possível navegar por toda a interface usando apenas teclado e setas?
- [ ] O elemento focado está imediatamente visível em laranja?
- [ ] Os botões têm área de toque de no mínimo 44px em telas menores?
- [ ] As animações respeitam `prefers-reduced-motion`?
- [ ] As imagens têm textos alternativos (`alt`) descritivos?

---

## 5. Referências
- `docs/development/coding-standards.md`
- Skill dependente: `cinefoxy-design-system`
