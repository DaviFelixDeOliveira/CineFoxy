---
name: cinefoxy-error-handling
description: Catálogo universal de erros, mapeamento de status HTTP para mensagens humanizadas em português e estratégias de recuperação no CineFoxy.
---

# CineFoxy — Sistema Centralizado de Erros

## 1. Visão Geral
O CineFoxy adota um catálogo centralizado de tratamento de erros. A premissa central é que o usuário final **nunca** deve ser confrontado com códigos HTTP brutos, rastros de pilha (*stack traces*) ou mensagens em inglês. As mensagens devem ser claras, amigáveis, em português brasileiro e, sempre que possível, oferecer um caminho de recuperação.

---

## 2. Estrutura do Catálogo de Erros (`src/services/error/errorCatalog.ts`)

Todo erro mapeado segue a interface `AppError`:
```typescript
export interface AppError {
  code: string;           // Código semântico interno (ex: ERR_NOT_FOUND)
  userMessage: string;    // Mensagem humanizada em português
  httpStatus?: number;    // Código HTTP associado
  canRetry: boolean;      // Se permite tentativa de recuperação
  actionLabel?: string;   // Texto do botão de ação (ex: 'Tentar novamente')
}
```

### 2.1. Mapeamento Explícito de Códigos HTTP

| HTTP Status | Código Interno | Mensagem em Português Apresentada ao Usuário | Ação / Recuperação |
| :--- | :--- | :--- | :--- |
| `400` | `ERR_BAD_REQUEST` | "A solicitação não pôde ser processada." | Sem repetição |
| `401` | `ERR_UNAUTHORIZED` | "Acesso não autorizado ao recurso." | Sem repetição |
| `403` | `ERR_FORBIDDEN` | "Você não tem permissão para acessar este conteúdo." | Sem repetição |
| `404` | `ERR_NOT_FOUND` | "O conteúdo solicitado não foi encontrado." | "Voltar ao início" |
| `408` | `ERR_TIMEOUT` | "O servidor demorou muito para responder. Verifique sua conexão." | "Tentar novamente" |
| `429` | `ERR_RATE_LIMIT` | "Muitas solicitações simultâneas. Aguarde um instante." | "Tentar novamente" (com backoff) |
| `500` | `ERR_SERVER_ERROR` | "Ocorreu um erro interno nos servidores do catálogo." | "Tentar novamente" |
| `502` | `ERR_BAD_GATEWAY` | "Serviço temporariamente indisponível." | "Tentar novamente" |
| `503` | `ERR_SERVICE_UNAVAILABLE` | "O serviço está em manutenção ou sobrecarregado." | "Tentar novamente" |
| `504` | `ERR_GATEWAY_TIMEOUT` | "Tempo limite esgotado ao contatar o servidor." | "Tentar novamente" |

### 2.2. Erros de Aplicação e Conexão
- `ERR_OFFLINE`: "Você está sem conexão com a internet. Verifique seu Wi-Fi ou cabo de rede." (Oferece botão "Tentar novamente").
- `ERR_STORAGE`: "Não foi possível salvar suas preferências locais." (Aviso discreto sem travar o aplicativo).

---

## 3. Diretrizes de Segurança
1. **Zero Vazamento Técnico:** Nunca imprima `error.stack`, chaves de API ou payloads brutos no DOM.
2. **Separação de Logs:** Mensagens técnicas são enviadas a `console.error` exclusivamente em ambiente de desenvolvimento.
3. **Idempotência no Retry:** Repetições automáticas só são permitidas para requisições seguras do tipo `GET` em códigos transitórios (408, 429, 503, 504).

---

## 4. Checklist de Validação
- [ ] O erro é traduzido para mensagem amigável em português?
- [ ] Erros que admitem recuperação fornecem botão de ação ("Tentar novamente")?
- [ ] Nenhum detalhe técnico sensível é exibido na interface?
- [ ] A tela de erro utiliza o componente padronizado `ErrorState`?

---

## 5. Referências
- `docs/development/error-handling.md`
- Skill dependente: `cinefoxy-design-system`
