# CineFoxy — Visão Geral da Arquitetura

## 1. Visão do Produto
O CineFoxy é uma plataforma web moderna, cinematográfica e de alta performance voltada ao entretenimento audiovisual, integrando filmes, séries e canais ao vivo em uma experiência única, fluida e consistente em desktops, smartphones e Smart TVs (com foco específico no Amazon Fire TV).

---

## 2. Princípios Arquiteturais

1. **Separação de Camadas:**
   - **Apresentação (UI):** Componentes atômicos e de domínio que consomem exclusivamente tokens semânticos e modelos internos.
   - **Serviços & Adaptadores:** Camada de integração que isola as particularidades das APIs externas (TMDB, TVmaze).
   - **Persistência Local Desacoplada:** Fachada de armazenamento com fallback em memória para navegadores com restrições.
2. **Independência de Provedores:** Novos provedores de catálogo ou fontes de reprodução autorizada podem ser adicionados sem a necessidade de reescrever telas ou regras de negócio.
3. **Qualidade Estrita:** TypeScript em modo estrito, 100% de cobertura em componentes críticos e testes automatizados contínuos com Vitest.

---

## 3. Fases do Roadmap
- **Fase 1 (Atual):** Fundação técnica, Design System, Temas (Claro, Escuro e Sistema), componentes fundamentais, feedback e documentação.
- **Fase 2:** Interface completa, Hero Banners imersivos e catálogo visual enriquecido.
- **Fase 3:** Integração real com APIs do TMDB, TVmaze e pesquisa global com debounce.
- **Fase 4:** Páginas de detalhes, temporadas e episódios.
- **Fase 5:** Player com fontes públicas autorizadas e controles para controle remoto.
- **Fase 6:** Canais ao vivo e guia EPG.
- **Fase 7:** Favoritos, histórico e persistência em IndexedDB.
- **Fase 8:** Otimização, auditoria de segurança e publicação final no Netlify.
