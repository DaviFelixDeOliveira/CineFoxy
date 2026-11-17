# CineFoxy — Políticas e Práticas de Segurança

## 1. Princípios Gerais de Segurança
A segurança do CineFoxy abrange desde o código executado no navegador até o proxy serverless de comunicação com a API do TMDB.

---

## 2. Diretrizes Técnicas

### 2.1. Content Security Policy (CSP)
- Configurada em `netlify.toml` com cabeçalhos restritivos:
  - `default-src 'self'`
  - `script-src 'self' 'sha256-NZasksZ3qvcCgxJIvhhO39tYukrZyeuvyZ8JnXUPjXY='` (hash SHA-256 exato do script síncrono anti-FOUC no `index.html`, sem `'unsafe-inline'`).
  - `style-src 'self' 'unsafe-inline'` (necessário para estilos inline dinâmicos de tokens de gênero em React).
  - `img-src 'self' data: https://image.tmdb.org` (imagens locais, fallbacks SVG em `data:` e CDN oficial do TMDB).
  - `font-src 'self' data:`
  - `connect-src 'self'` (todas as requisições do catálogo passam por `/api/catalog` na própria origem).
  - `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`.

### 2.2. Zero Segredos no Frontend
- A credencial `TMDB_API_READ_ACCESS_TOKEN` é **exclusiva de ambiente server-side** (Netlify Functions).
- Nunca utilizar prefixo `VITE_` para tokens do TMDB.
- Chaves privadas ou tokens nunca devem constar no código fonte, em `localStorage`/`sessionStorage`, em logs ou no bundle `dist/`.

### 2.3. Prevenção de Proxy Aberto e Ataques SSRF em Netlify Functions
- `netlify/functions/catalog.ts` rejeita métodos diferentes de `GET` (`405`), bloqueia parâmetros arbitrários (`url`, `target`, `endpoint`, `host`, `proxy`, etc.) com `400` e restringe chamadas externas exclusivamente a `https://api.themoviedb.org` mediante validação de origem.
- Erros upstream (`401`, `403`, `429`, `5xx`) são normalizados sem expor tokens, variáveis internas ou infraestrutura.
