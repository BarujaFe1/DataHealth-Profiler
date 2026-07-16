<div align="center">
  <img src="./icon.png" alt="DataHealth Profiler Logo" width="120" height="120" />

  <h1>DataHealth Profiler</h1>

  <p><strong>Lab introdutório: profiler de saúde de CSV com flags explicáveis e score (planejado: FastAPI + Next.js).</strong></p>
  <p><strong>Introductory lab: CSV data-health profiler with explainable flags and score (planned: FastAPI + Next.js).</strong></p>

  <p>
    <a href="#pt-br">PT-BR</a>
     · 
    <a href="#english">English</a>
     · 
    <a href="#live-demo">Live Demo</a>
     · 
    <a href="#stack">Stack</a>
     · 
    <a href="#architecture">Architecture</a>
     · 
    <a href="#quick-start">Quick Start</a>
     · 
    <a href="#author">Author</a>
  </p>

  <p>
    <img alt="Status-Spec%20%2F%20docs" src="https://img.shields.io/badge/Status-Spec%20%2F%20docs-0f766e?style=for-the-badge" />
    <img alt="Planned-FastAPI" src="https://img.shields.io/badge/Planned-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
    <img alt="Planned-Next.js" src="https://img.shields.io/badge/Planned-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="License-MIT" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  </p>

  <p>
    <a href="https://datahealth-profiler.vercel.app"><strong>Live Demo</strong></a>
     · 
    <a href="https://github.com/BarujaFe1/DataHealth-Profiler"><strong>Repo</strong></a>
     · 
    <a href="https://barujafe.vercel.app/"><strong>Portfolio</strong></a>
     · 
    <a href="https://www.linkedin.com/in/barujafe/"><strong>LinkedIn</strong></a>
  </p>
</div>


> **Honest status:** this GitHub repository currently contains **product documentation + license/icon** (no application source tree in the clone). Treat implementation details below as the **planned V1 lab**. Related, fuller codebase: **DataFlow**. Homepage URL is reserved for the lab deploy when published.

---

## PT-BR

### Visão geral
O **DataHealth Profiler** é o conceito/lab introdutório de um profiler de CSV: upload → parsing → profiling → quality flags → health score → relatório visual.

### Problema
Antes de modelar, ninguém responde com clareza: “essa base está saudável o bastante?” — faltam flags explicáveis e um score legível.

### Para quem
Iniciantes em dados e analistas que querem um **primeiro cockpit de saúde tabular**.

### Funcionalidades (planejadas / documentadas)
- Upload e parsing de CSV
- Profiling por coluna
- Quality flags explicáveis
- Health score e relatório visual
- Stack alvo documentada: FastAPI + Next.js (+ Plotly/pandas no discurso do README legado)

### Escopo e limites (honestos)
- **Repo docs-first** no estado atual do Git — não invente código que não está aqui
- Não é certificação LGPD nem suite enterprise
- Para lab implementado e rico, veja **DataFlow**

---

## English

### Overview
**DataHealth Profiler** is the introductory CSV health-profiler concept/lab: upload → parse → profile → explainable flags → health score → visual report.

### Problem
Before modeling, teams cannot clearly answer “is this table healthy enough?” — missing explainable flags and a readable score.

### Who it is for
Data beginners and analysts who want a **first tabular health cockpit**.

### Features (planned / documented)
- CSV upload and parsing
- Per-column profiling
- Explainable quality flags
- Health score and visual report
- Documented target stack: FastAPI + Next.js

### Scope and honest limits
- **Docs-first repo** in the current Git tree — do not invent missing source
- Not LGPD certification or an enterprise suite
- For a rich implemented lab, see **DataFlow**

---

## Live Demo

| Surface | URL |
|---|---|
| **Public lab** | [https://datahealth-profiler.vercel.app](https://datahealth-profiler.vercel.app) |
| **GitHub** | see Repo badge above |

**How to try:** if the deploy is live, walk upload → flags → score; if not, use this README + DataFlow as the concrete sibling lab.



## Stack

| Layer | Technology (planned / documented) |
|---|---|
| Web | Next.js |
| API | FastAPI, pandas (as documented) |
| Repo today | README + LICENSE + icon |

---

## Architecture

Documented pipeline: **Upload → Parsing → Profiling → Quality flags → Health score → Visual report**.

---

## Quick Start

No application package is present in this repository snapshot. Use the sibling **DataFlow** repo to run a concrete profiling lab, or implement V1 following the sections in this README’s history/docs.

---

## Technical decisions

- Keep an **introductory** profiler narrative separate from the richer DataFlow anchor
- Prefer **explainable flags** over a single opaque score
- Be explicit when the repo is **spec/docs** vs shipped code

---

## Roadmap

- Publish application source matching the V1 spec
- Align homepage deploy with the documented lab
- Cross-link demos with DataFlow case studies

---

## Author

**Felipe Alirio Baruja** — data / product / full-stack portfolio.

- Portfolio: [https://barujafe.vercel.app/](https://barujafe.vercel.app/)
- GitHub: [https://github.com/BarujaFe1](https://github.com/BarujaFe1)
- LinkedIn: [https://www.linkedin.com/in/barujafe/](https://www.linkedin.com/in/barujafe/)


## License

MIT — see [`LICENSE`](./LICENSE).
