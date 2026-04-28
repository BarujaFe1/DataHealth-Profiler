# PROMPT DE CONTINUAÇÃO — EXECUTAR PHASE 10

Use este prompt na próxima sessão para executar Phase 10 sem replanejar.

---

Você é um Frontend Engineer especializado em design systems e polish visual de produtos premium.

Seu objetivo é executar **Phase 10: Visual Premium Foundation** do projeto DataHealth Profiler localizado em `C:\dev\datahealth-profiler`.

## CONTEXTO RÁPIDO

O projeto está **80% completo** com fundação técnica sólida. Precisa de **polish visual** para atingir nível premium Apple-like.

**Auditoria completa:** `docs/AUDIT_2026-04-27.md`  
**Plano de execução:** `docs/CONTINUITY_PLAN.md`  
**Estado atual:** `docs/SUMMARY.md`

## SUA MISSÃO

Executar as 7 tarefas da Phase 10 em ordem:

### Task 1: Carregar Geist Fonts (15min)
**Arquivo:** `app/layout.tsx`

Adicione Geist Sans e Geist Mono via next/font. Configure com `display: 'swap'`. Aplique ao elemento html.

**Critério de aceite:** Fonts carregam sem FOUT, tipografia melhora imediatamente.

---

### Task 2: Refinar Health Score Card (30min)
**Arquivo:** `components/report/health-score-card.tsx`

- Aumentar spacing (mb-2 → mb-3)
- Score maior (text-5xl → text-6xl)
- Melhorar breakdown de dimensões (space-y-3 → space-y-4)
- Adicionar dividers sutis entre dimensões
- Refinar hierarquia tipográfica

**Critério de aceite:** Score é proeminente, dimensões claras, card parece premium.

---

### Task 3: Refinar Dataset Meta Card (30min)
**Arquivo:** `components/report/dataset-meta-card.tsx`

- Dataset name maior e mais proeminente
- Mais spacing em stats (space-y-3 → space-y-4)
- Adicionar dividers sutis entre stats
- Timestamp mais sutil
- Melhor hierarquia visual

**Critério de aceite:** Nome destaca, stats são escaneáveis, spacing generoso.

---

### Task 4: Refinar Summary Stat Card (20min)
**Arquivo:** `components/report/summary-stat-card.tsx`

- Icon container maior (h-10 w-10 → h-12 w-12)
- Background sutil no icon container
- Melhorar hierarquia número/label
- Consistência com outros cards

**Critério de aceite:** Ícone proeminente, número destaca, consistente.

---

### Task 5: Melhorar Attention Callout (30min)
**Arquivo:** `components/report/attention-callout.tsx`

- Ícone maior (h-5 w-5 → h-6 w-6)
- Adicionar border-left accent (4px, warning color)
- Mais spacing (p-6 → p-8)
- Severity indicators mais proeminentes
- Background tint sutil

**Critério de aceite:** Callout se destaca, critical items visíveis, parece importante.

---

### Task 6: Refinar Type Badges (30min)
**Arquivo:** `components/report/type-badge.tsx`

- Adicionar ícones de lucide-react:
  - integer/float: Hash
  - string: Type
  - boolean: ToggleLeft
  - date/datetime: Calendar
  - categorical: Tag
  - mixed/unknown: HelpCircle
- Cores mais sutis
- Padding melhor (px-2 py-0.5 → px-2.5 py-1)
- Sizing consistente

**Critério de aceite:** Badges têm ícones, cores refinadas, sizing consistente.

---

### Task 7: Refinar Flag Chips (30min)
**Arquivo:** `components/report/flag-chip.tsx`

- Adicionar ícones de lucide-react:
  - high_nulls: AlertCircle
  - high_cardinality: TrendingUp
  - low_cardinality: TrendingDown
  - outliers_detected: Zap
  - type_mismatch: AlertTriangle
  - duplicate_values: Copy
  - skewed_distribution: BarChart3
  - constant_value: Minus
  - suspicious_pattern: Eye
- Cores refinadas
- Hover states com transitions
- Spacing melhor

**Critério de aceite:** Chips têm ícones, cores refinadas, hover funciona.

---

## REGRAS IMPORTANTES

### FAZER:
✅ Focar em refinamento visual apenas  
✅ Usar tokens existentes do design system  
✅ Manter estrutura de componentes  
✅ Testar após cada tarefa  
✅ Commitar após cada tarefa completa

### NÃO FAZER:
❌ Refatorar arquitetura  
❌ Mudar state management  
❌ Adicionar features novas  
❌ Mudar APIs de componentes  
❌ Quebrar funcionalidade existente

## TESTE APÓS CADA TAREFA

```bash
npm run dev
```

1. Abrir http://localhost:3000
2. Clicar "Try Demo Dataset"
3. Verificar melhorias visuais
4. Checar console para erros
5. Testar interações

## CRITÉRIOS DE SUCESSO DA PHASE 10

Ao final, o projeto deve ter:
- ✅ Geist fonts carregando corretamente
- ✅ Cards com hierarquia visual clara
- ✅ Attention callout que se destaca
- ✅ Badges com ícones e personalidade
- ✅ Chips com ícones e polish
- ✅ Spacing mais consistente
- ✅ Identidade visual estabelecida

## APÓS COMPLETAR PHASE 10

Reporte o que foi feito e pergunte se deve continuar para **Phase 11: Premium Table** ou parar.

---

**COMECE AGORA COM TASK 1: Carregar Geist fonts em `app/layout.tsx`**

Não replanejar. Não auditar novamente. Apenas executar as 7 tarefas acima em ordem.
