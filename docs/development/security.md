# CineFoxy — Políticas e Práticas de Segurança

## 1. Princípios Gerais de Segurança
A segurança do CineFoxy abrange desde o código executado no navegador até a comunicação com APIs externas.

---

## 2. Diretrizes Técnicas

### 2.1. Content Security Policy (CSP)
- Na publicação final, o Netlify deverá injetar cabeçalhos CSP que limitem a execução de scripts e o carregamento de fontes e imagens.
- O script síncrono anti-FOUC inserido no `<head>` do `index.html` deve ser documentado com seu hash SHA-256 para permitir validação estrita sem necessidade de `'unsafe-inline'`.

### 2.2. Zero Segredos no Frontend
- Chaves de API de terceiros com permissões restritas a leitura pública (ex.: chave de busca do TMDB) devem ser isoladas e configuradas via variáveis de ambiente `VITE_*`.
- Chaves privadas ou tokens com cotas de faturamento nunca são empacotados no bundle do cliente.

### 2.3. Prevenção de Ataques SSRF em Serverless Functions
- Quaisquer funções serverless futuras que atuem como proxy para APIs externas deverão manter uma whitelist rígida de hosts permitidos (ex.: `api.themoviedb.org`, `api.tvmaze.com`), impedindo requisições arbitrárias para a rede interna ou infraestrutura em nuvem.
