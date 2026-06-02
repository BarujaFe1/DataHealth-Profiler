<div align="center">
  <img src="./icon.png" alt="DataHealth Profiler Logo" width="120" height="120" />

  <h1>DataHealth Profiler</h1>

  <p><strong>Abra um CSV e entenda, em segundos, onde estão os riscos do dataset</strong></p>
  <p><strong>Open a CSV and understand, in seconds, where the dataset risks are</strong></p>

  <p>
    <a href="#pt-br">PT-BR</a> •
    <a href="#en">English</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#quick-start--início-rápido">Quick Start</a> •
    <a href="#arquitetura--architecture">Arquitetura</a> •
    <a href="#autor--author">Autor</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-in%20progress-0f766e.svg" alt="Status in progress" />
    <img src="https://img.shields.io/badge/frontend-Next.js-111827.svg?logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/backend-FastAPI-0ea5e9.svg?logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/data-pandas-150458.svg?logo=pandas&logoColor=white" alt="pandas" />
    <img src="https://img.shields.io/badge/charts-Plotly-3f4f75.svg?logo=plotly&logoColor=white" alt="Plotly" />
    <img src="https://img.shields.io/badge/license-MIT-16a34a.svg" alt="MIT License" />
  </p>
</div>

---

<a id="pt-br"></a>

## 🇧🇷 PT-BR

## 📊 Visão geral

**DataHealth Profiler** é uma ferramenta web para **profiling inicial e leitura rápida de qualidade de dados** em arquivos CSV.

A ideia é simples: o usuário envia um dataset tabular e recebe um relatório visual que ajuda a responder, logo no início da análise, perguntas como:

- Quantas linhas e colunas existem?
- Quais colunas têm muitos valores nulos?
- Quais parecem numéricas, categóricas, identificadores ou suspeitas?
- Onde há alta cardinalidade?
- Existem colunas constantes, vazias ou mal interpretadas?
- O dataset está minimamente saudável para começar uma EDA, dashboard ou modelo?

Em vez de depender sempre de exploração manual em notebook, o projeto transforma essa primeira inspeção em um fluxo mais claro, repetível e apresentável.

> **Pergunta central:** esse dataset está saudável o suficiente para começar a análise, e quais colunas precisam de atenção primeiro?

---

## 🎯 Problema que resolve

Quem trabalha com dados conhece o cenário: um CSV chega, a pressão por análise começa, mas o dataset ainda é uma caixa-preta.

Antes de qualquer insight, é preciso gastar tempo com tarefas básicas e repetitivas:

- inspecionar colunas;
- medir missingness;
- inferir tipos;
- checar cardinalidade;
- identificar colunas constantes;
- procurar sinais de parsing ruim;
- detectar possíveis identificadores;
- entender se a base está aceitável ou problemática.

Essa etapa importa porque erros simples no começo contaminam todo o restante do trabalho. Um tipo mal interpretado, uma coluna quase vazia, duplicatas não percebidas ou um identificador tratado como feature podem distorcer análises, dashboards, modelos e decisões.

O **DataHealth Profiler** nasce para reduzir esse atrito.

---

## 💡 Proposta

A proposta é entregar uma experiência objetiva, enxuta e útil:

1. O usuário faz upload de um CSV.
2. O backend valida e interpreta o arquivo.
3. O sistema calcula métricas básicas de estrutura e qualidade.
4. A interface retorna um relatório visual com score, flags e pontos de atenção.
5. O usuário entende rapidamente por onde começar e onde tomar cuidado.

O projeto não tenta ser uma plataforma enterprise de data observability, governança ou catálogo de dados. A ambição da V1 é ser uma ferramenta **publicável, elegante, útil e tecnicamente consistente** para a primeira camada do problema.

---

## ✅ O que este projeto é

- Uma ferramenta de profiling inicial para CSV.
- Um produto demonstrável de data quality e EDA inicial.
- Um projeto de portfólio orientado a problema real.
- Uma interface séria para leitura rápida de datasets.
- Um exemplo de integração entre backend analítico e UX clara.
- Um fluxo stateless: upload entra, relatório sai.

## ❌ O que este projeto não é

- Não é plataforma enterprise de data observability.
- Não é clone completo de Great Expectations.
- Não é monitoramento contínuo de pipelines.
- Não é data catalog.
- Não é suite de governança.
- Não é sistema com autenticação, times, permissões e persistência na V1.

Esse corte é intencional. O valor do projeto está justamente em fazer **bem** a primeira camada do problema.

---

## ✨ Capacidades planejadas

### V1

- Upload de CSV.
- Preview tabular do dataset.
- Resumo geral da base.
- Inferência básica de tipos.
- Missingness por coluna.
- Cardinalidade.
- Estatísticas descritivas básicas.
- Distribuição de colunas numéricas.
- Top valores de colunas categóricas.
- Flags simples de qualidade.
- Score/semáforo de saúde.
- Estados de loading, empty e error.
- Demo pública com datasets seed.

### V1.1

- Exportação de relatório.
- Mais flags de qualidade.
- Comparação antes/depois de limpeza.
- Suporte a formatos simples adicionais, como TSV e XLSX.

### V2

- Regras customizadas.
- Perfis salvos.
- Comparação entre datasets.
- Integração com armazenamento.
- Camada de persistência.

---

## 🧪 Como funciona

### 1. Upload

O usuário envia um arquivo CSV.

### 2. Parsing

O backend valida o arquivo, lê os dados e identifica a estrutura básica.

### 3. Profiling

Cada coluna é analisada para gerar:

- tipo inferido;
- taxa de nulos;
- cardinalidade;
- estatísticas básicas;
- distribuição;
- sinais simples de risco.

### 4. Quality flags

O sistema aplica regras pequenas, explicáveis e úteis para destacar colunas problemáticas.

### 5. Health score

As flags são consolidadas em um score/semáforo para facilitar a leitura inicial do dataset.

### 6. Relatório visual

A interface apresenta:

- resumo geral;
- colunas que exigem atenção;
- tabela navegável;
- detalhes por coluna;
- gráficos úteis para rápida interpretação.

---

## 🚩 Exemplos de flags da V1

A V1 usa um conjunto pequeno e forte de sinais:

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

A intenção não é parecer “inteligente” demais. A intenção é ser **útil, coerente e explicável**.

---

## 🖥️ Interface planejada

### Tela de upload

- Dropzone clara.
- Opção de dataset demo.
- Validações simples.
- Mensagem de valor direta.

### Resumo do dataset

- Linhas.
- Colunas.
- Completude.
- Duplicatas.
- Score geral de saúde.

### Tabela de colunas

- Nome.
- Tipo inferido.
- Nulos.
- Valores únicos.
- Flags.
- Acesso rápido ao detalhe.

### Detalhe por coluna

- Estatísticas.
- Amostras.
- Distribuição.
- Top valores.
- Explicação curta do que merece atenção.

### Estados da aplicação

- Loading com skeleton.
- Empty state forte.
- Erro legível.
- Mensagem positiva quando o dataset parece saudável.

---

<a id="en"></a>

## 🇺🇸 English

## 📊 Overview

**DataHealth Profiler** is a web tool for **initial data profiling and fast data quality assessment** in CSV files.

The idea is simple: the user uploads a tabular dataset and receives a visual report that helps answer, at the very beginning of the analysis, questions such as:

- How many rows and columns are there?
- Which columns have many missing values?
- Which columns look numeric, categorical, identifier-like or suspicious?
- Where is cardinality too high?
- Are there constant, empty or poorly parsed columns?
- Is the dataset healthy enough to start EDA, a dashboard or a model?

Instead of relying only on manual notebook exploration, the project turns this first inspection into a clearer, repeatable and presentable workflow.

> **Central question:** is this dataset healthy enough to start analyzing, and which columns need attention first?

---

## 🎯 Problem solved

Anyone who works with data knows the scenario: a CSV arrives, the pressure to analyze starts, but the dataset is still a black box.

Before any insight, time is spent on basic and repetitive tasks:

- inspecting columns;
- measuring missingness;
- inferring types;
- checking cardinality;
- identifying constant columns;
- searching for parsing issues;
- detecting possible identifiers;
- understanding whether the dataset is acceptable or problematic.

This step matters because early data issues can contaminate everything that comes after. A misinterpreted type, an almost-empty column, unnoticed duplicates or an identifier treated as a feature can distort analyses, dashboards, models and decisions.

**DataHealth Profiler** was created to reduce this friction.

---

## 💡 Proposal

The project delivers an objective, lean and useful experience:

1. The user uploads a CSV.
2. The backend validates and parses the file.
3. The system calculates basic structure and quality metrics.
4. The interface returns a visual report with score, flags and attention points.
5. The user quickly understands where to start and where to be careful.

The project does not try to be an enterprise data observability, governance or data catalog platform. The V1 ambition is to be a **publishable, elegant, useful and technically consistent** tool for the first layer of the problem.

---

## ✅ What this project is

- An initial CSV profiling tool.
- A demonstrable data quality and early EDA product.
- A portfolio project oriented around a real problem.
- A serious interface for fast dataset reading.
- An example of analytical backend and clear UX integration.
- A stateless flow: upload in, report out.

## ❌ What this project is not

- It is not an enterprise data observability platform.
- It is not a full Great Expectations clone.
- It is not continuous pipeline monitoring.
- It is not a data catalog.
- It is not a governance suite.
- It is not a system with authentication, teams, permissions and persistence in V1.

This cut is intentional. The value is in doing the first layer of the problem **well**.

---

## ✨ Planned capabilities

### V1

- CSV upload.
- Tabular dataset preview.
- General dataset summary.
- Basic type inference.
- Missingness by column.
- Cardinality.
- Basic descriptive statistics.
- Numeric column distributions.
- Top values for categorical columns.
- Simple quality flags.
- Health score / traffic-light indicator.
- Loading, empty and error states.
- Public demo with seed datasets.

### V1.1

- Report export.
- More quality flags.
- Before/after cleaning comparison.
- Support for simple additional formats such as TSV and XLSX.

### V2

- Custom rules.
- Saved profiles.
- Dataset comparison.
- Storage integration.
- Persistence layer.

---

## 🧪 How it works

### 1. Upload

The user uploads a CSV file.

### 2. Parsing

The backend validates the file, reads the data and identifies the basic structure.

### 3. Profiling

Each column is analyzed to generate:

- inferred type;
- missing value rate;
- cardinality;
- basic statistics;
- distribution;
- simple risk signals.

### 4. Quality flags

The system applies small, explainable and useful rules to highlight problematic columns.

### 5. Health score

Flags are consolidated into a score / traffic-light indicator to make the first dataset reading easier.

### 6. Visual report

The interface presents:

- general summary;
- columns that need attention;
- navigable table;
- column-level details;
- charts for quick interpretation.

---

## 🚩 V1 flag examples

The V1 uses a small and strong set of signals:

- high missingness;
- completely empty column;
- constant column;
- possible identifier;
- excessive cardinality;
- highly skewed distribution;
- many outliers;
- duplicate rows;
- simple parsing inconsistency;
- excessive dominance of zeros.

The goal is not to look overly “smart”. The goal is to be **useful, coherent and explainable**.

---

## 🖥️ Planned interface

### Upload screen

- Clear dropzone.
- Demo dataset option.
- Simple validations.
- Direct value message.

### Dataset summary

- Rows.
- Columns.
- Completeness.
- Duplicates.
- General health score.

### Column table

- Name.
- Inferred type.
- Missing values.
- Unique values.
- Flags.
- Quick access to details.

### Column detail

- Statistics.
- Samples.
- Distribution.
- Top values.
- Short explanation of what needs attention.

### Application states

- Skeleton loading.
- Strong empty state.
- Readable error state.
- Positive message when the dataset looks healthy.

---

<a id="tech-stack"></a>

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Plotly**

### Backend

- **FastAPI**
- **Python 3.11+**
- **pandas**
- **Pydantic**

### Quality and delivery

- **GitHub Actions**
- **Vercel** for frontend
- **Railway** or **Render** for backend

---

<a id="arquitetura--architecture"></a>

## 🏗️ Arquitetura / Architecture

```txt
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

### Principais decisões técnicas / Main technical decisions

- **pandas na V1:** ideal para datasets pequenos e médios, acelerando implementação sem complexidade desnecessária.
- **Backend separado:** FastAPI mantém o motor analítico isolado, reutilizável e limpo.
- **Sem banco na V1:** a aplicação é stateless. Upload entra, relatório sai.
- **Score + flags:** a leitura não depende apenas de avisos soltos; o score responde rapidamente se a base está saudável, em atenção ou crítica.

---

## 📁 Estrutura do repositório / Repository structure

```txt
datahealth-profiler/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── docs/
│   ├── product-requirements.md
│   ├── architecture.md
│   ├── roadmap.md
│   ├── data-model.md
│   └── api-contract.md
├── frontend/
├── backend/
├── data/
│   ├── titanic_dirty.csv
│   ├── ecommerce_dirty.csv
│   └── payroll_dirty.csv
├── scripts/
├── assets/
└── .github/
```

### Diretórios principais / Main directories

- `frontend/` → interface da aplicação / application interface
- `backend/` → API e motor de profiling / API and profiling engine
- `data/` → datasets seed e exemplos / seed datasets and examples
- `docs/` → PRD, arquitetura, roadmap e contratos / PRD, architecture, roadmap and contracts
- `scripts/` → automações simples / simple automations
- `assets/` → screenshots, logo e mídia / screenshots, logo and media
- `.github/` → CI, templates e organização / CI, templates and organization

---

<a id="quick-start--início-rápido"></a>

## 🚀 Quick Start / Início rápido

### Pré-requisitos / Requirements

- Node.js 20+
- Python 3.11+
- npm or pnpm
- pip

### Estrutura local esperada / Expected local structure

```txt
/frontend
/backend
/data
/docs
```

### Setup inicial / Initial setup

A implementação principal ainda está em construção. A estrutura recomendada para a V1 é:

#### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## 🗺️ Roadmap

### Fase 0 — Setup e documentação

- [ ] Definir escopo.
- [ ] Finalizar README.
- [ ] Criar PRD.
- [ ] Documentar arquitetura.
- [ ] Criar roadmap.
- [ ] Definir contratos iniciais.

### Fase 1 — Backend core

- [ ] Leitura de CSV.
- [ ] Profiling básico.
- [ ] Flags.
- [ ] Score.
- [ ] Testes iniciais.

### Fase 2 — Fluxo principal do frontend

- [ ] Upload.
- [ ] Chamada para API.
- [ ] Summary.
- [ ] Score.
- [ ] Tabela de colunas.

### Fase 3 — Detalhes e gráficos

- [ ] Drawer/painel por coluna.
- [ ] Histogramas.
- [ ] Top valores.
- [ ] Callouts de atenção.

### Fase 4 — Polish

- [ ] Loading states.
- [ ] Error states.
- [ ] Empty state.
- [ ] Dark mode.
- [ ] Melhorias visuais.

### Fase 5 — Publicação

- [ ] Deploy.
- [ ] Screenshots.
- [ ] Demo pública.
- [ ] Vídeo curto.
- [ ] Narrativa final no README e LinkedIn.

---

## 🧬 Datasets seed planejados / Planned seed datasets

Para uma demo pública forte, o projeto terá datasets de exemplo com problemas controlados:

- `titanic_dirty.csv`
- `ecommerce_dirty.csv`
- `payroll_dirty.csv`

Esses arquivos devem incluir:

- nulos relevantes;
- coluna constante;
- possível identificador;
- duplicatas;
- alto skew;
- tipos misturados;
- cardinalidade desigual.

---

## ✅ Critérios de qualidade / Quality criteria

O projeto só estará “bom” quando:

- o valor do produto for entendível em menos de 30 segundos;
- a demo funcionar sem explicação longa;
- a V1 estiver publicada;
- o código estiver modular;
- a documentação estiver acima da média;
- o repositório transmitir seriedade;
- a UI parecer produto real;
- o motor analítico não for superficial.

---

## ⚠️ Riscos conhecidos / Known risks

- Virar ferramenta enterprise cedo demais.
- Adicionar persistência antes da hora.
- Tentar suportar formatos demais.
- Gastar energia excessiva em visual antes de consolidar o profiling.
- Inflar o número de flags sem aumentar utilidade real.

Este README também funciona como mecanismo de controle de escopo.

---

## 🧭 Como apresentar publicamente / Public positioning

### No GitHub

Como um produto técnico enxuto, bem estruturado e com documentação forte.

### No portfólio

Como uma ferramenta que transforma inspeção inicial de dados em experiência clara e demonstrável.

### No LinkedIn

Como um projeto que une analytics, engenharia, UX e bom julgamento de escopo.

---

## 📚 Documentação complementar / Additional documentation

- PRD: `docs/product-requirements.md`
- Arquitetura: `docs/architecture.md`
- Roadmap: `docs/roadmap.md`
- Modelo de dados: `docs/data-model.md`
- Contrato de API: `docs/api-contract.md`

---

## 🤝 Contribuição / Contributing

Este projeto é, antes de tudo, um produto de portfólio e estudo aplicado.

Sugestões, feedback e discussões técnicas são bem-vindos.

---

<a id="autor--author"></a>

## 👤 Autor / Author

Developed by **BarujaFe1**.

- **Portfolio:** [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- **GitHub:** [github.com/BarujaFe1](https://github.com/BarujaFe1/)
- **LinkedIn:** [linkedin.com/in/barujafe](https://www.linkedin.com/in/barujafe/)

---

## 📄 Licença / License

MIT License.

See [LICENSE](./LICENSE) for details.

---

<div align="center">
  <p><strong>DataHealth Profiler</strong></p>
  <p>Menos caixa-preta. Mais clareza. Melhor primeira decisão.</p>
  <p><em>Less black box. More clarity. Better first decision.</em></p>
</div>
