# CineFoxy — Sistema Tipográfico

## 1. Família Tipográfica
A tipografia oficial do CineFoxy é a **Inter**, uma fonte moderna, neutra e com excelente legibilidade em pequenas e grandes escalas, especialmente em televisores e telas móveis.

```css
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

---

## 2. Pesos e Estilos

- **Regular (400):** Utilizado em sinopses, textos secundários e parágrafos descritivos.
- **Medium (500):** Utilizado em metadados (ano, duração), itens de navegação e badges.
- **Semi-Bold (600):** Utilizado em títulos de cartazes de filmes/séries e botões.
- **Bold (700):** Utilizado em títulos de seções, banners principais e cabeçalhos.

---

## 3. Escala Modular de Tamanhos

| Token | Tamanho em Pixel | Altura de Linha (`line-height`) | Aplicação |
| :--- | :--- | :--- | :--- |
| `--text-xs` | `12px` | `1.4` | Badges de classificação indicativa, tags e EPG |
| `--text-sm` | `14px` | `1.5` | Metadados, subtítulos e textos secundários |
| `--text-base` | `16px` | `1.5` | Corpo de texto padrão e botões médios |
| `--text-lg` | `18px` | `1.4` | Títulos de cards de destaque e botões grandes de TV |
| `--text-xl` | `20px` | `1.3` | Títulos de seções (ex.: "Filmes em Destaque") |
| `--text-2xl` | `24px` | `1.2` | Títulos secundários de páginas |
| `--text-3xl` | `32px` | `1.2` | Títulos principais de páginas |
| `--text-4xl` | `44px` | `1.1` | Títulos cinematográficos de Hero Banners |

---

## 4. Legibilidade em Smart TVs e Fire TV
Como a interface em televisores é consumida a distâncias médias de 2 a 4 metros:
- O tamanho mínimo de fonte para qualquer texto interativo é de `14px`.
- Títulos de botões de controle e navegação utilizam no mínimo `16px` a `18px`.
- Textos de títulos em cards de mídia são restritos a no máximo 2 linhas com elipse (`-webkit-line-clamp: 2`).
