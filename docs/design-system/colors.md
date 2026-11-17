# CineFoxy — Sistema de Cores e Tokens de Tema

## 1. Identidade e Filosofia
O CineFoxy adota uma identidade visual cinematográfica onde as produções em catálogo são os verdadeiros protagonistas. A cor da marca é o **Laranja Fox**, aplicada pontualmente em elementos de foco, botões de ação e indicadores de destaque.

---

## 2. Paleta Oficial da Marca

| Nome | Hex | CSS Custom Property | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Laranja Fox** | `#FF5722` | `--brand-primary` | Cor principal, ações prioritárias, foco visual |
| **Laranja Vivo** | `#FF7A00` | `--brand-hover` | Estado de hover em botões primários |
| **Laranja Suave**| `#FF9E40` | `--brand-soft` | Realces, detalhes e badges |
| **Laranja Profundo**| `#C83D18` | `--brand-active` | Estado ativo/clique |
| **Branco Contraste**| `#FFFFFF` | `--brand-contrast` | Texto sobre superfícies na cor Laranja Fox |

---

## 3. Paleta do Tema Escuro (`data-theme="dark"`) — Padrão

| Token Semântico | Hexadecimal | Finalidade | Relação de Contraste |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#090909` | Fundo principal da aplicação | Base cinematográfica |
| `--surface` | `#141414` | Fundo de cartazes, cards e header | Alto contraste com texto |
| `--surface-elevated` | `#1E1E1E` | Superfícies sobrepostas e dropdowns | Contraste tátil |
| `--border-default` | `#303030` | Bordas e divisores de seção | Contraste sutil 3:1 |
| `--text-primary` | `#FFFFFF` | Títulos e leitura principal | 19.5:1 (WCAG AAA) |
| `--text-secondary` | `#A3A3A3` | Metadados, subtítulos e sinopses | 7.3:1 (WCAG AAA) |
| `--text-muted` | `#737373` | Textos desativados e placeholders | 3.8:1 |
| `--focus-ring` | `#FF5722` | Contorno de foco `:focus-visible` | Alto destaque para TV |

---

## 4. Paleta do Tema Claro (`data-theme="light"`)

| Token Semântico | Hexadecimal | Finalidade | Relação de Contraste |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#F5F5F5` | Fundo principal da aplicação | Base limpa e confortável |
| `--surface` | `#FFFFFF` | Fundo de cards e header | Alto contraste com fundo |
| `--surface-elevated` | `#EBEBEB` | Superfícies elevadas e menus | Separação visual |
| `--border-default` | `#DDDDDD` | Bordas e contornos de cards | 3.2:1 |
| `--text-primary` | `#171717` | Títulos e leitura principal | 15.2:1 (WCAG AAA) |
| `--text-secondary` | `#666666` | Metadados e informações secundárias | 5.7:1 (WCAG AA) |
| `--text-muted` | `#8C8C8C` | Placeholders | 3.4:1 |
| `--focus-ring` | `#E94B1B` | Contorno de foco `:focus-visible` | Destaque acessível |

---

## 5. Tokens de Estado e Feedback

| Token Semântico | Tema Escuro | Tema Claro | Finalidade |
| :--- | :--- | :--- | :--- |
| `--status-error` | `#EF4444` | `#DC2626` | Alertas críticos e falhas de conexão |
| `--status-success` | `#10B981` | `#059669` | Confirmações e transmissões ativas |
| `--status-warning` | `#F59E0B` | `#D97706` | Avisos temporários |
| `--overlay-dark` | `rgba(0, 0, 0, 0.75)` | `rgba(0, 0, 0, 0.5)` | Fundo de modais e gavetas |
