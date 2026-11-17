# CineFoxy — Diretrizes do Sistema de Erros

## 1. Visão Geral
Toda falha que possa impactar o usuário no CineFoxy deve ser interceptada e apresentada através de uma mensagem amigável em português brasileiro, acompanhada de um botão de ação quando a recuperação for possível.

---

## 2. Catálogo Oficial de Status HTTP (`errorCatalog.ts`)

| Código | Descrição Técnica | Mensagem Apresentada ao Usuário | Ação de Recuperação |
| :--- | :--- | :--- | :--- |
| `400` | Bad Request | "A requisição não pôde ser processada." | Sem repetição |
| `401` | Unauthorized | "Acesso não autorizado ao recurso." | Sem repetição |
| `403` | Forbidden | "Você não tem permissão para acessar este conteúdo." | Sem repetição |
| `404` | Not Found | "O conteúdo solicitado não foi encontrado." | Botão "Voltar ao início" |
| `408` | Request Timeout | "O servidor demorou muito para responder. Verifique sua conexão." | Botão "Tentar novamente" |
| `429` | Too Many Requests | "Muitas solicitações simultâneas. Aguarde um instante." | Botão "Tentar novamente" |
| `500` | Internal Server Error | "Ocorreu um erro interno nos servidores do catálogo." | Botão "Tentar novamente" |
| `502` | Bad Gateway | "Serviço temporariamente indisponível." | Botão "Tentar novamente" |
| `503` | Service Unavailable | "O serviço está em manutenção ou sobrecarregado." | Botão "Tentar novamente" |
| `504` | Gateway Timeout | "Tempo limite esgotado ao contatar o servidor." | Botão "Tentar novamente" |

---

## 3. Componente `ErrorState`
Quando um erro impede a exibição de uma lista de cartazes ou seção, o componente `ErrorState` é renderizado localmente:
- Ícone de alerta suave.
- Título claro em português.
- Mensagem explicativa.
- Botão "Tentar novamente" vinculado à função de retry.
