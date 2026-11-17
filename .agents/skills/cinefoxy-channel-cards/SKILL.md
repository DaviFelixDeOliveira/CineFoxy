---
name: cinefoxy-channel-cards
description: Diretrizes dos cards de canais de transmissão ao vivo, proporção 16:9, indicador AO VIVO e grade de programação.
---

# CineFoxy — Padrão de Cards de Canais (`ChannelCard`)

## 1. Visão Geral
O componente `ChannelCard` foi projetado especificamente para transmissões ao vivo. Ao contrário dos filmes e séries, os canais utilizam a proporção cinematográfica horizontal 16:9, destacando a logo do canal e as atrações no ar.

---

## 2. Especificação Geométrica e Visual

- **Proporção da Imagem/Logo:** Rigorosamente **16:9** (`aspect-ratio: 16 / 9`).
- **Logo Centralizada:** A logo do canal deve ficar centralizada sobre fundo neutro contrastante (`var(--surface-elevated)`).
- **Badge "AO VIVO":** Indicador no canto superior esquerdo com fundo translúcido escuro, ponto indicador vermelho pulsante discreto e texto semântico "AO VIVO".
- **Arredondamento:** 8px (`var(--radius-md)`).
- **Foco e Hover:** Elevação suave de 2px e contorno de foco Laranja Fox (`var(--focus-ring)`).

---

## 3. Estrutura de Informações (EPG Preliminar)

```text
+-----------------------------------+
| [🔴 AO VIVO]                      |
|                                   |
|           [ LOGO DO CANAL ]       |
|                                   |
+-----------------------------------+
| Nome do Canal                     |
| No ar: Programa Atual             |
| A seguir: Próxima Atração (Horário)|
+-----------------------------------+
```

- **Nome do Canal:** Tipografia nítida e destacada (`var(--text-primary)`).
- **Programa Atual:** Linha com ícone sutil ou texto indicando o que está passando no momento.
- **Próxima Atração:** Texto secundário com previsão de início quando disponível.

---

## 4. Checklist de Validação
- [ ] O card de canal utiliza proporção 16:9 (nunca 2:3)?
- [ ] O indicador "AO VIVO" está legível com ponto indicador visível?
- [ ] A logo é redimensionada com `object-fit: contain` para não distorcer?
- [ ] O componente se adapta a grades de 2 a 4 colunas em telas de televisão?
- [ ] As dimensões combinam com `ChannelSkeleton` para prevenir layout shift?

---

## 5. Referências
- `docs/design-system/components.md`
- Skills dependentes: `cinefoxy-design-system`, `cinefoxy-loading-states`
