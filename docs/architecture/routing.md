# CineFoxy — Arquitetura de Rotas e Navegação

## 1. Visão Geral
O roteamento do CineFoxy é gerenciado pelo **React Router DOM v6** no modo Single Page Application (SPA), com suporte a deep linking (URLs individuais e compartilháveis) e compatibilidade total com o Netlify (`/* -> /index.html 200`).

---

## 2. Mapa Central de Rotas

| Rota | Descrição | Componente Associado (Fase 1: Placeholder) |
| :--- | :--- | :--- |
| `/` | Página Inicial | `HomePage` |
| `/filmes` | Catálogo de Filmes | `MoviesPage` |
| `/series` | Catálogo de Séries | `SeriesPage` |
| `/canais` | Canais ao Vivo e EPG | `ChannelsPage` |
| `/minha-lista` | Favoritos do Usuário | `FavoritesPage` |
| `/historico` | Continue Assistindo | `HistoryPage` |
| `/pesquisa` | Busca Global | `SearchPage` |
| `*` | Página 404 (Não Encontrado) | Tratamento pelo catálogo de erros |

---

## 3. Comportamento SPA no Netlify
O arquivo `netlify.toml` presente na raiz do repositório garante que qualquer rota acessada diretamente pelo navegador seja respondida com o `index.html` gerado na pasta `dist`, preservando o estado e o histórico de navegação do usuário.
