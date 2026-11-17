# CineFoxy — Estratégia de Cache e Armazenamento Temporário

## 1. Visão Geral
*Documento de planejamento arquitetural para a Fase 3 e Fase 7.*

Para minimizar requisições desnecessárias, respeitar as cotas de taxa das APIs e garantir carregamento instantâneo em redes lentas ou conexões de Smart TV, o CineFoxy adotará uma estratégia de cache com Time-To-Live (TTL).

---

## 2. Janelas de Expiração (TTL)

- **Conteúdos em Alta / Destaques da Home:** 1 hora de TTL.
- **Páginas de Detalhes de Títulos:** 24 horas de TTL.
- **Resultados de Pesquisa:** 15 minutos de TTL.
- **Grade de Canais (EPG):** 15 minutos de TTL.

---

## 3. Armazenamento de Cache
O cache de metadados temporários utilizará a memória volátil da sessão (`MemoryStorage`) durante a navegação, enquanto favoritos e histórico serão persistidos em `IndexedDB` a partir da Fase 7.
