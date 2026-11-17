# CineFoxy — Estratégia de Cache e Armazenamento Temporário

## 1. Visão Geral
*Documento atualizado na Etapa 3.2 (Infraestrutura Segura).*

Para minimizar requisições desnecessárias, respeitar as cotas de taxa do TMDB e garantir carregamento instantâneo em redes lentas ou conexões de Smart TV, o CineFoxy separa explicitamente o cache da CDN Netlify (`Netlify-CDN-Cache-Control`) do cache do navegador (`Cache-Control`), além de prever cache volátil em memória na sessão nas próximas etapas.

---

## 2. Políticas HTTP por Tipo de Resposta

- **Listagens Públicas Futuras (`trending`, `discover`, catálogos e coleções):**
  - `Netlify-CDN-Cache-Control`: `public, durable, max-age=1800, stale-while-revalidate=3600`
  - `Cache-Control` (Navegador): `public, max-age=300`
- **Gêneros e Dados de Referência Públicos Futuros:**
  - `Netlify-CDN-Cache-Control`: `public, durable, max-age=86400, stale-while-revalidate=604800`
  - `Cache-Control` (Navegador): `public, max-age=3600`
- **Pesquisas (`search`):**
  - `Netlify-CDN-Cache-Control`: `no-store` (sem cache público de CDN por padrão)
  - `Cache-Control` (Navegador): `private, no-store`
  - Futuro cache volátil em memória limitado à sessão (TTL de referência: 15 minutos) será implementado na Etapa 3.9.
- **Erros HTTP (`4xx`, `429`, `5xx`):**
  - `Netlify-CDN-Cache-Control`: `no-store`
  - `Cache-Control`: `no-store`

---

## 3. Validação e Armazenamento Local
- A validação efetiva do cache da CDN (`Cache-Status`) deve ser realizada em Deploy Preview ou Produção na Netlify (testes locais validam apenas a emissão correta dos cabeçalhos HTTP).
- Favoritos e histórico serão persistidos localmente em `IndexedDB` somente a partir da Fase 7.
