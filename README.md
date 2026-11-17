# CineFoxy — Plataforma de Entretenimento Cinematográfico

O **CineFoxy** é uma plataforma web de entretenimento audiovisual moderna, cinematográfica e imersiva inspirada na raposa. A interface foi concebida para oferecer navegação fluida em computadores desktop, dispositivos móveis e Smart TVs (com foco no Amazon Fire TV).

---

## 🦊 Identidade Visual e Design System

- **Tema Principal:** Escuro por padrão (`#090909`), com suporte completo aos modos Claro e Sistema.
- **Cor de Destaque:** Laranja Fox (`#FF5722`), utilizado para ações importantes e foco acessível.
- **Tipografia:** `Inter` com fallback para fontes do sistema.
- **Grid Espacial:** Baseado rigorosamente em múltiplos de 4px.
- **Padrão de Cartazes (Filmes e Séries):** Proporção vertical estrita `2:3`.
- **Padrão de Canais:** Proporção cinematográfica `16:9` com indicador de transmissão ao vivo.
- **Carregamento Visual:** Skeleton Loading imersivo com prevenção de Cumulative Layout Shift (CLS).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 20+)
- npm 9+

### Instalação, Configuração Local e Desenvolvimento
```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente locais (copiar exemplo; nunca commitar .env)
cp .env.example .env
# Preencha TMDB_API_READ_ACCESS_TOKEN no .env quando for testar chamadas reais na Etapa 3.3+

# 3. Iniciar servidor local padrão (Vite na porta 3000)
npm run dev

# 4. Iniciar ambiente integrado com Netlify Functions (/api/catalog)
npm run dev:netlify

# 5. Executar verificação de tipos TypeScript (inclui netlify/functions)
npm run typecheck

# 6. Executar suíte de testes automatizados com Vitest
npm test

# 7. Compilar bundle de produção (Vite + TypeScript)
npm run build
```

---

## 📁 Estrutura Arquitetural (Fase 1)

```text
CineFoxy/
├── .agents/skills/     # 13 Agent Skills operacionais do CineFoxy
├── docs/               # 17 Documentos técnicos oficiais (Design System, Arquitetura, API)
├── public/
│   └── img/logo.png    # Logo oficial da raposa
├── src/
│   ├── app/            # Inicialização, ThemeProvider e Roteador central
│   ├── components/     # Componentes visuais atômicos, layout, cards e feedback
│   ├── features/       # Páginas de domínio (Início, Filmes, Séries, Canais, etc.)
│   ├── services/       # Catálogo centralizado de erros e adaptadores
│   ├── storage/        # Utilitário de persistência segura de tema
│   ├── styles/         # Tokens de design, temas, reset e estilos globais
│   └── types/          # Contratos estritos de dados TypeScript
└── tests/              # Testes unitários com Vitest e Testing Library
```

---

## 📋 Status do Roadmap

- [x] **Fase 1:** Fundação técnica, Design System, Temas (Claro/Escuro/Sistema), componentes fundamentais e testes.
- [x] **Fase 2:** Experiência visual completa, Hero Banner cinematográfico com Animated Poster Wall, navegação Desktop e Drawer Mobile (960px), 17 categorias de gênero, coleções editoriais (14 filmes + 13 séries), fileiras com rolagem horizontal e skeletons pareados.
- [ ] **Fase 3:** Integração do catálogo TMDB e pesquisa global.
- [ ] **Fase 4:** Detalhes de títulos, temporadas e episódios.
- [ ] **Fase 5:** Player com fontes públicas autorizadas.
- [ ] **Fase 6:** Canais ao vivo e guia EPG.
- [ ] **Fase 7:** Favoritos, histórico e persistência em IndexedDB.
- [ ] **Fase 8:** Otimização, testes avançados e publicação.
