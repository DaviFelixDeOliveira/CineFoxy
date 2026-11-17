---
name: cinefoxy-security
description: Políticas e diretrizes de segurança no frontend, sanitização, Content Security Policy e proteção de dados no CineFoxy.
---

# CineFoxy — Diretrizes de Segurança

## 1. Visão Geral
A segurança no CineFoxy é tratada de ponta a ponta. Como a aplicação roda no navegador do usuário (inclusive em navegadores de TV e dispositivos móveis), a integridade do código e a proteção de dados são inegociáveis.

---

## 2. Regras Fundamentais de Segurança

1. **Zero Credenciais Privadas no Cliente:** Nenhuma chave secreta de API, token com privilégios de escrita ou senha pode constar no código fonte ou nos pacotes distribuídos (`dist/`).
2. **Content Security Policy (CSP):**
   - Na publicação final, cabeçalhos CSP rígidos devem limitar a execução de scripts e conexões aos domínios estritamente autorizados (ex.: Netlify, TMDB, TVmaze).
   - O script inline anti-FOUC no `<head>` deve ser compatível com CSP através de `hash` (SHA-256) ou `nonce`. Não utilize `'unsafe-inline'` em ambientes de produção com dados sensíveis.
3. **Prevenção de SSRF e Requisições Indevidas:**
   - Funções serverless futuras (Netlify Functions) que atuarem como proxy devem validar rigorosamente a URL de destino contra uma whitelist explícita de domínios permitidos, prevenindo ataques de Server-Side Request Forgery.
4. **Sanitização de Dados:** Textos provenientes de APIs externas de catálogo (sinopses, títulos, biografias) devem ser renderizados de forma segura via React (escapamento nativo), nunca usando `dangerouslySetInnerHTML`.
5. **Armazenamento Seguro:** Não armazene dados confidenciais ou tokens sensíveis no `localStorage` ou `IndexedDB`. Utilize-os unicamente para preferências de interface e histórico local.

---

## 3. Checklist de Validação
- [ ] O código não contém tokens, credenciais ou segredos em texto claro?
- [ ] O script anti-FOUC possui hash documentado para compatibilidade com CSP?
- [ ] Nenhum conteúdo externo é injetado sem sanitização ou via `dangerouslySetInnerHTML`?
- [ ] Mensagens de erro para o usuário não expõem URLs internas, IPs ou caminhos de servidor?

---

## 4. Referências
- `docs/development/security.md`
