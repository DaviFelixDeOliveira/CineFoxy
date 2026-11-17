# CineFoxy — Sistema Espacial (Grid e Espaçamentos)

## 1. Princípio da Base 4px
Todo o sistema de layout, paddings, margens e alturas de componentes no CineFoxy obedece estritamente a múltiplos de **4px**. Essa métrica elimina desalinhamentos e garante harmonia geométrica entre cartazes, banners e contêineres.

---

## 2. Tabela de Tokens Espaciais

| Token | Valor em Pixels | Aplicação Típica |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Espaçamentos mínimos internos de badges e tags |
| `--space-2` | `8px` | Lacuna entre ícone e texto; padding interno de inputs |
| `--space-3` | `12px` | Padding horizontal de botões compactos |
| `--space-4` | `16px` | Padding padrão de botões e espaçamento entre cards em celular |
| `--space-5` | `20px` | Espaçamento intermediário entre elementos de formulário |
| `--space-6` | `24px` | Padding de botões grandes e espaçamento entre cards em desktop |
| `--space-8` | `32px` | Margem inferior de seções e trilhos |
| `--space-10` | `40px` | Espaçamento vertical entre grandes blocos de conteúdo |
| `--space-12` | `48px` | Padding lateral em telas grandes e Smart TVs |
| `--space-16` | `64px` | Margem superior de banners e cabeçalhos de página |

---

## 3. Breakpoints e Largura de Contêiner

```css
--container-max-width: 1400px;
```

### Breakpoints Responsivos
- **Mobile Pequeno / Médio:** `< 640px` (Paddings laterais de `16px`, 2 colunas de cartazes).
- **Tablet / Mobile Grande:** `640px - 1024px` (Paddings laterais de `24px`, 3 a 4 colunas de cartazes).
- **Desktop / Smart TV:** `> 1024px` (Paddings laterais de `48px`, 5 a 6 colunas de cartazes).
