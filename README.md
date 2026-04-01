# DataHealth Profiler

> Abra um CSV e entenda, em segundos, onde estão os riscos do dataset.

<p align="left">
  <img alt="Status" src="https://img.shields.io/badge/status-in%20progress-0f766e">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-Next.js-111827">
  <img alt="Backend" src="https://img.shields.io/badge/backend-FastAPI-0ea5e9">
  <img alt="Data" src="https://img.shields.io/badge/data-pandas-150458">
  <img alt="Charts" src="https://img.shields.io/badge/charts-Plotly-3f4f75">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-16a34a">
</p>

## Visão geral

O **DataHealth Profiler** é uma ferramenta web para profiling inicial e leitura rápida de qualidade de dados em arquivos CSV.

A ideia é simples: você envia um dataset tabular e recebe um relatório visual que ajuda a responder, logo no começo da análise, perguntas como:

- Quantas colunas existem?
- Quais têm muitos valores nulos?
- Quais parecem numéricas, categóricas ou suspeitas?
- Onde há alta cardinalidade?
- Quais colunas merecem atenção antes de qualquer EDA, dashboard ou modelo?
- O dataset está minimamente saudável para começar?

Em vez de depender sempre de exploração manual no notebook, a ferramenta transforma essa etapa em um fluxo mais claro, repetível e apresentável.

---

## O problema

Quem trabalha com dados conhece esse momento: um CSV chega, a pressão para analisar começa, mas o dataset ainda é uma caixa-preta.

Antes de qualquer insight, é preciso gastar tempo com tarefas básicas e repetitivas:

- inspecionar colunas;
- medir missingness;
- inferir tipos;
- checar cardinalidade;
- notar colunas constantes;
- procurar sinais de parsing ruim;
- tentar entender se a base está “ok” ou se já nasce problemática.

Essa etapa importa porque erros simples no começo contaminam todo o resto. Um tipo mal interpretado, uma coluna quase vazia ou um identificador tratado como feature podem distorcer análises, dashboards e decisões.

O **DataHealth Profiler** nasce para reduzir esse atrito.

---

## A proposta

O projeto propõe uma experiência objetiva:

1. o usuário faz upload de um CSV;
2. o sistema faz parsing e profiling do dataset;
3. o backend calcula métricas básicas de estrutura e qualidade;
4. a interface devolve um relatório visual claro, com flags e score de saúde;
5. o usuário entende rapidamente por onde começar — e onde tomar cuidado.

A ambição aqui não é virar plataforma enterprise de governança ou observabilidade.  
A ambição é ser uma ferramenta **enxuta, útil, elegante e publicável**.

---

## O que este projeto é

- Uma ferramenta de profiling inicial para CSV.
- Um produto demonstrável de data quality / EDA inicial.
- Um projeto de portfólio orientado a problema real.
- Uma interface séria para leitura rápida de datasets.
- Um exemplo de integração entre backend analítico e UX clara.

## O que este projeto não é

- Não é uma plataforma enterprise de data observability.
- Não é um clone completo de Great Expectations.
- Não é monitoramento contínuo de pipelines.
- Não é data catalog.
- Não é uma suite de governança.
- Não é um sistema com autenticação, times, permissões e persistência na V1.

Esse corte é intencional. O valor do projeto está justamente em fazer **bem** a primeira camada do problema.

---

## Por que este projeto existe

Este projeto existe por dois motivos.

### 1) Resolver uma dor real
A abertura e inspeção inicial de datasets é um ponto de atrito muito comum. Quase toda análise começa com uma fase pouco glamourosa, mas crítica: entender estrutura, tipos, nulos, distribuição e riscos básicos.

### 2) Provar capacidade de construir produto técnico
O projeto também é uma peça estratégica de portfólio. Ele foi pensado para demonstrar:

- raciocínio analítico;
- capacidade de lidar com dados imperfeitos;
- modelagem de backend/API;
- organização de código e contratos;
- UX aplicada a contexto técnico;
- senso de escopo;
- habilidade de transformar problema recorrente em ferramenta real.

---

## O que o projeto quer provar

O **DataHealth Profiler** quer provar que eu consigo:

- construir uma ferramenta analítica de verdade, e não apenas um notebook;
- estruturar um problema de dados em módulos pequenos e entregáveis;
- trabalhar com dados imperfeitos e decisões pragmáticas;
- desenhar contratos entre frontend e backend;
- comunicar qualidade de dados com clareza visual;
- tomar decisões de escopo para publicar algo forte em vez de inflar arquitetura.

---

## Usuários-alvo

### Usuário principal
- Analistas de dados
- Estudantes avançados
- Cientistas de dados em fase inicial de exploração
- Profissionais de BI abrindo datasets novos

### Usuário secundário
- Product analysts
- Freelancers
- Pessoas em formação em dados
- Recrutadores e gestores técnicos vendo o projeto como portfólio

---

## Pergunta central que a ferramenta responde

> **“Esse dataset está saudável o suficiente para eu começar a analisar, e quais colunas precisam de atenção primeiro?”**

---

## Capacidades planejadas

### V1
- Upload de CSV
- Preview tabular do dataset
- Resumo geral do dataset
- Inferência básica de tipos
- Missingness por coluna
- Cardinalidade
- Estatísticas descritivas básicas
- Distribuição de colunas numéricas
- Top valores de colunas categóricas
- Flags simples de qualidade
- Score/semáforo de saúde
- Estados de loading, empty e error
- Demo pública com datasets seed

### V1.1
- Export de relatório
- Mais flags de qualidade
- Comparação antes/depois de limpeza
- Suporte a formatos simples adicionais, como TSV e XLSX

### V2
- Regras customizadas
- Perfis salvos
- Comparação entre datasets
- Integração com armazenamento
- Camada de persistência

---

## Escopo da V1

A V1 foi desenhada para ser **realista, terminável e publicável**.

Ela entra no ponto exato onde o projeto ganha força:
- utilidade imediata;
- visual forte;
- backend analítico consistente;
- narrativa boa para portfólio.

### Entra na V1
- fluxo completo de upload e processamento;
- relatório com resumo, perfis, flags e score;
- visualizações úteis;
- linguagem clara;
- dataset demo;
- documentação sólida;
- demo pública.

### Não entra na V1
- autenticação;
- banco de dados;
- múltiplos datasets;
- colaboração;
- regras customizáveis;
- observabilidade pesada;
- export sofisticado;
- plataforma enterprise.

---

## Como funciona

### 1. Upload
O usuário envia um arquivo CSV.

### 2. Parsing
O backend valida o arquivo, lê os dados e identifica estrutura básica.

### 3. Profiling
Cada coluna é analisada para gerar:
- tipo inferido;
- taxa de nulos;
- cardinalidade;
- estatísticas básicas;
- distribuição;
- sinais simples de risco.

### 4. Quality flags
O sistema aplica regras pequenas, mas convincentes, para destacar colunas problemáticas.

### 5. Health score
As flags são consolidadas em um score/semáforo de saúde para facilitar a leitura inicial do dataset.

### 6. Relatório visual
A interface apresenta:
- resumo geral;
- colunas com atenção;
- tabela navegável;
- detalhes por coluna;
- gráficos úteis para rápida interpretação.

---

## Exemplo de flags da V1

A proposta da V1 é usar um conjunto pequeno e forte de sinais, como:

- alta taxa de nulos;
- coluna completamente vazia;
- coluna constante;
- possível identificador;
- cardinalidade excessiva;
- distribuição muito assimétrica;
- muitos outliers;
- presença de duplicatas;
- inconsistência simples de parsing;
- domínio excessivo de zeros.

A intenção não é parecer “inteligente” demais.  
A intenção é ser **útil, coerente e explicável**.

---

## Interface planejada

A interface foi pensada com cara de ferramenta profissional, não de experimento visual.

### Tela de upload
- dropzone clara;
- opção de dataset demo;
- validações simples;
- mensagem de valor direta.

### Resumo do dataset
- linhas;
- colunas;
- completude;
- duplicatas;
- score geral de saúde.

### Tabela de colunas
- nome;
- tipo inferido;
- nulos;
- únicos;
- flags;
- acesso rápido ao detalhe.

### Detalhe por coluna
- estatísticas;
- amostras;
- distribuição;
- top valores;
- explicação curta do que merece atenção.

### Estados
- loading com skeleton;
- empty state forte;
- erro legível;
- mensagem positiva quando o dataset parece saudável.

---

## Stack prevista

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Plotly

### Backend
- FastAPI
- Python
- pandas
- Pydantic

### Qualidade e entrega
- GitHub Actions
- Vercel no frontend
- Railway ou Render no backend

---

## Decisões técnicas principais

### pandas na V1
A escolha por `pandas` é intencional. Para datasets pequenos e médios, ele resolve muito bem, acelera a implementação e reduz atrito desnecessário.

### Backend separado
O backend fica em FastAPI para manter o motor analítico isolado, reutilizável e limpo.

### Sem banco na V1
A aplicação é stateless na primeira versão.  
Upload entra, relatório sai.  
Persistência cedo seria inflar complexidade sem aumentar valor do MVP.

### Score + flags
A ferramenta não depende só de uma lista de avisos. O score ajuda a responder rápido se o dataset está saudável, em atenção ou crítico.

---

## Arquitetura resumida

```text
┌───────────────────────────────────────┐
│               Frontend                │
│ Next.js + TypeScript + Tailwind + UI  │
│ Upload · Summary · Table · Charts     │
└───────────────────┬───────────────────┘
                    │
                    │ multipart/form-data
                    ▼
┌───────────────────────────────────────┐
│                Backend                │
│       FastAPI + pandas + Pydantic     │
│ Ingestion · Profiling · Flags · Score │
└───────────────────┬───────────────────┘
                    │
                    ▼
           JSON Report / Profile Result
```

---

## Estrutura do repositório

```text
datahealth-profiler/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── docs/
├── frontend/
├── backend/
├── data/
├── scripts/
├── assets/
└── .github/
```

### Diretórios principais

- `frontend/` → interface da aplicação
- `backend/` → API e motor de profiling
- `data/` → datasets seed e exemplos
- `docs/` → PRD, arquitetura, roadmap e contratos
- `scripts/` → automações simples
- `assets/` → screenshots, logo e mídia
- `.github/` → CI, templates e organização

---

## Roadmap

### Fase 0 — Setup e documentação
- definição do escopo;
- README;
- PRD;
- arquitetura;
- roadmap;
- contratos iniciais.

### Fase 1 — Backend core
- leitura de CSV;
- profiling básico;
- flags;
- score;
- testes iniciais.

### Fase 2 — Fluxo principal do frontend
- upload;
- chamada para API;
- summary;
- score;
- tabela de colunas.

### Fase 3 — Detalhes e gráficos
- drawer/painel por coluna;
- histogramas;
- top valores;
- callouts de atenção.

### Fase 4 — Polish
- loading states;
- erro;
- empty state;
- dark mode;
- melhorias visuais.

### Fase 5 — Publicação
- deploy;
- screenshots;
- demo pública;
- vídeo curto;
- narrativa final no README e LinkedIn.

---

## Status atual

**Status:** em construção

Neste momento, o foco do projeto está em:
- preparar um repositório forte;
- fechar contratos e documentação;
- implementar o backend mínimo;
- garantir um primeiro fluxo funcional ponta a ponta.

---

## Datasets seed planejados

Para que a demo pública seja forte, o projeto terá datasets de exemplo com problemas controlados, como:

- `titanic_dirty.csv`
- `ecommerce_dirty.csv`
- `payroll_dirty.csv`

Esses arquivos devem incluir casos úteis para demonstração:
- nulos relevantes;
- coluna constante;
- possível identificador;
- duplicatas;
- skew alto;
- tipos misturados;
- cardinalidade desigual.

---

## Critérios de qualidade do projeto

O projeto só estará “bom” quando cumprir estes critérios:

- o valor do produto é entendível em menos de 30 segundos;
- a demo funciona sem explicação longa;
- a V1 está publicada;
- o código está modular;
- a documentação está acima da média;
- o repositório transmite seriedade;
- a UI parece produto real;
- o motor analítico não é superficial.

---

## Riscos conhecidos

Os principais riscos do projeto são:

- virar ferramenta enterprise cedo demais;
- adicionar persistência antes da hora;
- tentar suportar formatos demais;
- gastar energia excessiva em visual antes de consolidar o motor de profiling;
- inflar o número de flags sem melhorar utilidade real.

Este README existe, inclusive, para ajudar a manter esse escopo sob controle.

---

## O que não será priorizado cedo

Para preservar chance real de terminar, estes itens ficam deliberadamente fora do foco inicial:

- autenticação;
- histórico de uploads;
- perfis salvos;
- comparações complexas;
- export PDF;
- regras customizadas;
- múltiplos formatos avançados;
- camada enterprise de observabilidade.

---

## Instruções iniciais

### Pré-requisitos
- Node.js 20+
- Python 3.11+
- npm ou pnpm
- pip

### Estrutura local esperada
```bash
/frontend
/backend
/data
/docs
```

### Setup inicial
Em breve.

> Enquanto a implementação principal não estiver publicada, este repositório serve como base-mestra de produto, arquitetura e roadmap.

---

## Desenvolvimento

### Filosofia
Este projeto segue algumas decisões claras:

- escopo enxuto;
- módulos pequenos;
- contratos definidos cedo;
- UX boa sem excesso;
- valor real antes de feature extra.

### Princípios
- terminar vale mais do que inflar;
- clareza vale mais do que complexidade;
- produto demonstrável vale mais do que arquitetura grandiosa;
- poucas decisões boas valem mais do que dezenas de features medianas.

---

## Como este projeto deve ser apresentado publicamente

### No GitHub
Como um produto técnico enxuto, bem estruturado e com documentação forte.

### No portfólio
Como uma ferramenta que transforma inspeção inicial de dados em experiência clara e demonstrável.

### No LinkedIn
Como um projeto que une analytics, engenharia, UX e bom julgamento de escopo.

---

## O que este projeto quer provar

Este projeto quer provar que eu sei:

- trabalhar com dados imperfeitos;
- construir backend analítico útil;
- estruturar uma ferramenta real;
- transformar dor de análise em produto;
- comunicar qualidade de dados com boa UX;
- fazer escolhas de escopo que aumentam a chance de entrega.

---

## Demonstração

- Demo pública: [em breve]
- Vídeo curto: [em breve]
- Screenshots: [em breve]

---

## Documentação complementar

- PRD: `docs/product-requirements.md`
- Arquitetura: `docs/architecture.md`
- Roadmap: `docs/roadmap.md`
- Modelo de dados: `docs/data-model.md`
- Contrato de API: `docs/api-contract.md`

---

## Contribuição

Este projeto é, antes de tudo, um produto de portfólio e estudo aplicado.  
Sugestões, feedback e discussões técnicas são bem-vindos.

---

## Licença

MIT License.
