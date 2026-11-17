---
name: cinefoxy-player
description: Arquitetura de reprodução de vídeo para fontes públicas autorizadas, controles acessíveis e compatibilidade de tela.
---

# CineFoxy — Arquitetura de Reprodução e Player

## 1. Visão Geral
O módulo de reprodução do CineFoxy é estritamente desacoplado do catálogo de metadados. Ele foi concebido para executar fontes de vídeo públicas, autorizadas ou licenciadas, garantindo conformidade legal e experiência de uso de alto nível.

---

## 2. Princípios Inegociáveis de Reprodução

1. **Separação Rígida:** APIs de metadados (TMDB/TVmaze) são catálogos de informação e **não** fontes de vídeo.
2. **Fontes Autorizadas Exclusivas:** A reprodução utiliza exclusivamente fontes abertas, canais públicos autorizados ou licenciados.
3. **Proibição Estrita:** É terminantemente vedada a implementação de mecanismos para contornar DRM, burlar paywalls, quebrar autenticações ou violar termos de serviço.
4. **Mídia Indisponível:** Se uma fonte externa autorizada estiver fora do ar ou incompatível, o player deve capturar o erro e exibir o `ErrorState` com mensagem clara ("Não foi possível reproduzir este conteúdo no momento").

---

## 3. Requisitos de Experiência e Controles

- **Controles por Controle Remoto (Fire TV):** Tecla Play/Pause, retroceder e avançar 10 segundos pelas setas laterais, controle de volume e barra de progresso visual.
- **Teclado:** Espaço (Play/Pause), M (Mudo), F (Tela Cheia), Setas esquerda/direita (Seek).
- **Legendas e Faixas de Áudio:** Seleção acessível quando fornecidas nativamente pelo stream.
- **Picture-in-Picture (PiP):** Suporte nativo onde a API do navegador permitir.

---

## 4. Checklist de Validação
- [ ] O player trata falhas de stream sem travar a aba do navegador?
- [ ] Os controles desaparecem automaticamente após inatividade do ponteiro ou controle?
- [ ] Não há nenhum contorno de proteção ou quebra de DRM no código?
- [ ] O componente respeita tela cheia em dispositivos móveis e Smart TVs?

---

## 5. Referências
- `docs/api/playback.md`
- Skill dependente: `cinefoxy-error-handling`
