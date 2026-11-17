# CineFoxy — Infraestrutura Segura da Fase 3 (Etapa 3.2)

## 1. Visão Geral da Infraestrutura
Na Etapa 3.2 foi preparada a base segura de comunicação entre o frontend React e o backend serverless na Netlify, **sem** ativar ainda chamadas reais ao TMDB nem alterar o catálogo demonstrativo exibido nas páginas.

```text
Frontend React (SPA) -> /api/catalog (rewrite 200) -> netlify/functions/catalog.ts -> [Etapa 3.3: TMDB API v3]
```

---

## 2. Credenciais e Variáveis de Ambiente
- Variável server-side obrigatória para as próximas etapas: **`TMDB_API_READ_ACCESS_TOKEN`**.
- **Regras:**
  - Nunca utilizar prefixo `VITE_` para tokens do TMDB.
  - Nunca armazenar tokens no código fonte, `localStorage`, `sessionStorage` ou bundle `dist/`.
  - Em produção/preview, configurar `TMDB_API_READ_ACCESS_TOKEN` diretamente nas *Environment Variables* do painel da Netlify.
  - Localmente, copiar `.env.example` para `.env` (ignorado pelo `.gitignore`).

---

## 3. Ambiente Local com Netlify Functions (`netlify dev`)
- `npm install`: instala dependências do aplicativo e `netlify-cli` (como `devDependency`).
- `npm run dev`: executa o servidor Vite padrão na porta `3000` (mantido integralmente para a interface SPA).
- `npm run dev:netlify` (ou `npx netlify dev`): executa o ambiente integrado da Netlify simulando o rewrite `/api/catalog -> /.netlify/functions/catalog` junto ao Vite local.
- `npm test`: executa a suíte Vitest.
- `npm run typecheck`: valida TypeScript (`src/`, `vite.config.ts` e `netlify/functions/`).
- `npm run build`: gera `dist/` pronto para publicação.

---

## 4. Roteamento Netlify (`netlify.toml`)
1. `from = "/api/catalog"` → `to = "/.netlify/functions/catalog"` (`status = 200`), posicionado **antes** do fallback SPA para impedir que requisições de API caiam no `index.html`.
2. `from = "/*"` → `to = "/index.html"` (`status = 200`), preservando todas as rotas do React Router.

---

## 5. Content Security Policy (CSP) e Segurança
Os cabeçalhos configurados em `netlify.toml` definem:
- `default-src 'self'`
- `script-src 'self' 'sha256-NZasksZ3qvcCgxJIvhhO39tYukrZyeuvyZ8JnXUPjXY='`: libera apenas scripts da própria origem e o script síncrono anti-FOUC do `index.html` validado por hash SHA-256 exato.
- `style-src 'self' 'unsafe-inline'`: compatibilidade necessária para estilos inline dinâmicos de tokens CSS de gênero em React.
- `img-src 'self' data: https://image.tmdb.org`: imagens locais, fallback SVG `data:` e CDN oficial de imagens do TMDB.
- `font-src 'self' data:`
- `connect-src 'self'`: o navegador consulta apenas o próprio domínio (`/api/catalog`), nunca diretamente APIs externas com credenciais.
- `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`
- Proteções adicionais na Function `catalog.ts`: bloqueio de métodos não-`GET` (`405`), rejeição de parâmetros de proxy aberto (`url`, `target`, `endpoint`, etc. com `400`), validação rígida de tipos/datas/limites e timeout de `8000ms` preparado para chamadas upstream.

---

## 6. Política de Cache (CDN vs. Navegador)
- **Listagens públicas futuras (`trending`, `discover`):**
  - `Netlify-CDN-Cache-Control: public, durable, max-age=1800, stale-while-revalidate=3600`
  - `Cache-Control: public, max-age=300`
- **Gêneros e dados de referência públicos futuros:**
  - `Netlify-CDN-Cache-Control: public, durable, max-age=86400, stale-while-revalidate=604800`
  - `Cache-Control: public, max-age=3600`
- **Pesquisas (`search`) e status:**
  - `Netlify-CDN-Cache-Control: no-store`
  - `Cache-Control: private, no-store`
  - *(Cache volátil em memória limitado à sessão poderá ser utilizado no cliente na Etapa 3.9.)*
- **Respostas de erro (`4xx`, `429`, `5xx`):**
  - `Netlify-CDN-Cache-Control: no-store`
  - `Cache-Control: no-store`
- **Validação de CDN:** Testes locais validam a emissão dos cabeçalhos HTTP. A validação real de cache distribuído (`Cache-Status`) ocorre somente em Deploy Preview ou Produção na Netlify.

---

## 7. Decisões Editoriais Registradas para Etapas Futuras

### 7.1. Joias Escondidas (Não implementar consultas nesta Etapa 3.2)
- **Filmes:** Nota mínima `7.6`; votos iniciais `150`, primeira flexibilização `135`, segunda flexibilização `120` (máximo 2 flexibilizações); popularidade moderada obrigatória com teto provisório **`popularity <= 35`**; excluir títulos presentes em *Em Alta*; ocultar se `< 5` títulos válidos.
- **Séries:** Nota mínima `7.8`; votos iniciais `100`, primeira flexibilização `90`, segunda flexibilização `80` (máximo 2 flexibilizações); popularidade moderada obrigatória com teto provisório **`popularity <= 45`**; excluir títulos presentes em *Em Alta*; ocultar se `< 5` títulos válidos.
- **Calibração:** Os limites de `popularity` (`35` e `45`) são critérios editoriais provisórios (não parâmetros nativos do TMDB Discover). Deverão ser calibrados uma única vez por amostragem real na Etapa 3.3 e congelados sem flexibilização automática.

### 7.2. Atribuição ao TMDB (Implementação futura no Footer)
- O CineFoxy **não** terá página exclusiva de créditos nesta fase.
- A atribuição será incorporada ao `Footer` existente em etapa posterior de apresentação de dados, preservando o layout atual, exibindo:
  - Texto oficial obrigatório: `"This product uses the TMDB API but is not endorsed or certified by TMDB."` (podendo acompanhar tradução em português sem substituí-lo).
  - Logotipo oficial aprovado do TMDB (sem alterações e em menor destaque que a marca CineFoxy) + link para o site oficial do TMDB.

### 7.3. Escopo do TVmaze
- **Fora do escopo da Fase 3 atual.** Não há chamadas, adaptadores, normalizadores ou dependências de runtime do TVmaze na Fase 3.
