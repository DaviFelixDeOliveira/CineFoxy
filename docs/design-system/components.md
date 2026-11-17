# CineFoxy — Especificação Anatômica de Componentes

## 1. Botão (`Button`)
Componente atômico para ações do usuário.

- **Variantes:**
  - `primary`: Fundo Laranja Fox (`var(--brand-primary)`), texto branco.
  - `secondary`: Fundo elevado (`var(--surface-elevated)`), borda sutil.
  - `outline`: Borda `1px solid var(--border-default)`, fundo transparente.
  - `ghost`: Sem borda, sem fundo.
  - `destructive`: Fundo vermelho de alerta (`var(--status-error)`).
- **Tamanhos:**
  - `sm`: Altura 32px, padding horizontal 12px, fonte 13px.
  - `md`: Altura 40px, padding horizontal 16px, fonte 14px.
  - `lg`: Altura 48px, padding horizontal 24px, fonte 16px (Ideal para Fire TV e mobile touch).
- **Estados:** `default`, `hover`, `:focus-visible` (anel de foco de 2px Laranja Fox), `active`, `disabled`, `loading`.

---

## 2. Card de Mídia (`MediaCard`)
Exibição de cartazes verticais de filmes e séries.

- **Proporção Geométrica:** `aspect-ratio: 2 / 3` estrita.
- **Arredondamento:** `border-radius: var(--radius-md)` (8px).
- **Tratamento de Imagem:** `object-fit: cover` com fallback visual enquanto carrega.
- **Título:** Truncamento em até 2 linhas (`-webkit-line-clamp: 2`) com altura fixa reservada para manter os metadados inferiores perfeitamente alinhados no grid.
- **Hover:** Elevação vertical de 4px (`transform: translateY(-4px)`) com sombra difusa.

---

## 3. Card de Canal (`ChannelCard`)
Exibição de transmissões ao vivo.

- **Proporção Geométrica:** `aspect-ratio: 16 / 9` horizontal.
- **Logotipo:** Centralizado sobre fundo escurecido contrastante (`object-fit: contain`).
- **Badge "AO VIVO":** Indicador superior esquerdo com ponto vermelho e texto acessível.
- **EPG Preliminar:** Nome do canal e atração atual.

---

## 4. Badge (`Badge`)
Etiquetas compactas para gênero, classificação indicativa ou notas.

- **Cores Semânticas:** `primary` (Laranja Fox suave), `neutral` (superfície neutra), `live` (vermelho vivo), `success` (verde).
- **Dimensões:** Altura 22px a 26px, cantos arredondados (`var(--radius-sm)` ou `var(--radius-full)`).
