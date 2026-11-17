---
name: cinefoxy-theme
description: Gerenciamento dos temas Claro, Escuro e Sistema, persistência em localStorage e prevenção de FOUC no CineFoxy.
---

# CineFoxy — Sistema de Temas (Claro, Escuro e Sistema)

## 1. Visão Geral
O CineFoxy suporta três modos de tema:
1. **Escuro (Padrão):** Foco na experiência cinematográfica imersiva (`--bg-primary: #090909`).
2. **Claro:** Interface refinada e de alta legibilidade, com personalidade própria (`--bg-primary: #F5F5F5`).
3. **Sistema:** Acompanha a preferência do sistema operacional via `prefers-color-scheme`.

---

## 2. Implementação e Ciclo de Vida

### 2.1. Atributo Semântico no DOM
O tema ativo é refletido no atributo `data-theme` do elemento raiz `<html>`:
```html
<html data-theme="dark"> <!-- ou data-theme="light" -->
```

### 2.2. Prevenção de FOUC (Flash of Unstyled/Wrong Content)
Para evitar que a tela pisque em branco antes da hidratação do React, um script síncrono no `<head>` do `index.html` lê o valor salvo em `localStorage.getItem('cinefoxy_theme')` e a media query `(prefers-color-scheme: dark)`:
```javascript
(function() {
  try {
    var stored = localStorage.getItem('cinefoxy_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
```

### 2.3. Sincronização Dinâmica em Tempo Real
Quando o modo selecionado for `system`, o `ThemeProvider` deve escutar mudanças na media query:
```typescript
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handleChange = (e: MediaQueryListEvent) => {
  if (currentTheme === 'system') {
    applyTheme(e.matches ? 'dark' : 'light');
  }
};
mediaQuery.addEventListener('change', handleChange);
```

### 2.4. Armazenamento Seguro
A preferência deve ser salva na chave `cinefoxy_theme`. Caso `localStorage` esteja indisponível (navegação anônima com quota zero ou restrições de TV), o erro deve ser capturado suavemente (`try/catch`), mantendo o estado da sessão em memória sem falhar a aplicação.

---

## 3. Tokens Semânticos por Tema

| Token Semântico | Tema Escuro (`[data-theme="dark"]`) | Tema Claro (`[data-theme="light"]`) |
| :--- | :--- | :--- |
| `--bg-primary` | `#090909` | `#F5F5F5` |
| `--surface` | `#141414` | `#FFFFFF` |
| `--surface-elevated` | `#1E1E1E` | `#EBEBEB` |
| `--border-default` | `#303030` | `#DDDDDD` |
| `--text-primary` | `#FFFFFF` | `#171717` |
| `--text-secondary` | `#A3A3A3` | `#666666` |
| `--brand-primary` | `#FF5722` | `#E94B1B` |
| `--focus-ring` | `#FF5722` | `#E94B1B` |

---

## 4. Checklist de Validação
- [ ] O tema escuro é o padrão na primeira visita?
- [ ] A troca para Claro e Sistema altera dinamicamente `data-theme` no `<html>`?
- [ ] O recarregamento da página mantém a escolha salva sem flash branco?
- [ ] Ao selecionar Sistema, a interface responde imediatamente à mudança de tema do SO?
- [ ] A aplicação continua funcionando normalmente se o `localStorage` for bloqueado?

---

## 5. Referências
- `docs/design-system/colors.md`
- `docs/architecture/providers.md`
- Skill dependente: `cinefoxy-design-system`
