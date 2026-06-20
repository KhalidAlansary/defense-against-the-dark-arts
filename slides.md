---
# Deck-wide configuration. See https://sli.dev/custom/#headmatter
theme: seriph
title: "AI Agents for the Automotive V-Cycle"
titleTemplate: "%s — CairoMotive"
info: |
  ## A Platform for AI-Assisted Software Engineering
  Orchestrating autonomous AI agents across the V-Cycle (SWE.1 / SWE.4 / SWE.6)
  with cybersecurity (TARA, SECO) and functional safety (HARA, FMEA, FTA) analysis.

  Built with [Slidev](https://sli.dev).
author: CairoMotive
keywords: v-cycle,aspice,iso26262,iso21434,ai-agents,cairo-motive
# Apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# Show line numbers in code blocks
lineNumbers: false
# Match the product brand: dark (quantum-black) by default
colorSchema: dark
# The product uses a geometric grotesque (New Science); Space Grotesk is the closest
# freely-available analog. Headings forced to sans in style.css.
fonts:
  sans: Space Grotesk
  serif: Space Grotesk
  mono: Fira Code
# Aspect ratio of the slides
aspectRatio: 16/9
# Enable presenter mode notes
download: true
exportFilename: defense
hideInToc: false
---

# AI Agents for the Automotive V-Cycle

Design and Implementation of a Web-Based Platform for AI Agents

<div class="pt-10 flex justify-center">
  <img :src="'/images/cairomotive-logo.svg'" alt="CairoMotive" class="h-20" />
</div>

<div class="abs-bl m-6 text-sm opacity-70 text-left">
  <div>Supervised by Prof. Dr. Hazem Abbas &amp; Eng. Mahmoud Soliman</div>
  <div>CairoMotive · {{ new Date().getFullYear() }}</div>
</div>

<!--
Presenter notes:
- Welcome the audience.
- One line: the platform brings AI agents to the automotive V-Cycle, with flexible
  deployment — from managed cloud to fully self-hosted — so teams control where
  their code and requirements live.
- State what the talk covers: team, problem, architecture, the V-Cycle
  workspaces, safety & security, and results.
- ~30 seconds.
-->

---
transition: fade-out
layout: default
---

# Outline

<div class="grid grid-cols-2 gap-x-10 gap-y-3 mt-10 max-w-3xl">

<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">1</span><span class="text-lg">Team Members</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">2</span><span class="text-lg">Introduction</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">3</span><span class="text-lg">System Architecture</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">4</span><span class="text-lg">The V-Cycle Workspaces</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">5</span><span class="text-lg">Safety &amp; Security</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">6</span><span class="text-lg">DevOps &amp; Infrastructure</span></div>
<div class="flex gap-3 items-baseline"><span class="text-2xl font-bold text-[#f9996c]">7</span><span class="text-lg">Results</span></div>

</div>

<!--
Roadmap of the talk. Point to the major sections and roughly how long each takes.
-->

---
layout: default
---

# 1. Team Members

<div class="max-w-xl mx-auto mt-10">

| Name                     | ID      |
| ------------------------ | ------- |
| Farah Abdelrahman Kamalo | 2000901 |
| Khalid Ayman Alansary    | 2100259 |
| Maryam Yasser Mohammed   | 2100730 |
| Mohamed Ashraf Mohamed   | 2100514 |
| Omar Abdelgaber Elsayed  | 2101048 |
| Salma Hamed Shaaban      | 2100636 |

</div>

<div class="mt-8 text-sm opacity-70 text-center leading-relaxed">
  <div>Supervised by Prof. Dr. Hazem Abbas &amp; Eng. Mahmoud Soliman</div>
  <div>In collaboration with CairoMotive</div>
</div>

<!--
Introduce the team briefly. Mention the CairoMotive collaboration and the
supervising staff.
-->

---
layout: section
---

# 2. Introduction

What we built, and why it matters

---
layout: default
---

# The Context

<v-clicks>

- **The V-Cycle** is the dominant paradigm in automotive software, formalized by **ASPICE** — every development phase (SWE.1–3) has a matching verification phase (SWE.4–6).
- Standards like **ISO 26262** (functional safety) and **ISO 21434** (cybersecurity) mandate rigorous **traceability** between requirements, design, code, and tests.
- **LLM-based AI agents** can now plan, generate, and validate engineering artifacts — but most platforms are **rigid SaaS** with no control over deployment.

</v-clicks>

<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> Organizations working with **proprietary code and confidential requirements** need **control over where artifacts and inference run** — and the option to keep them inside their own boundary.

</div>

<!--
Set the stage: V-Cycle + standards demand traceability; AI can help; but teams
need control over deployment and data governance. That flexibility is what the
platform provides.
-->

---
layout: default
---

# The Problem

<v-clicks>

- Generating test cases and requirements from documents is **high-effort** and must stay synchronized as requirements evolve.
- Manual work leads to **inconsistent interpretation**, **incomplete coverage**, and **brittle traceability** between a test and its originating requirement.
- Integrating AI into internal workflows raises **data-governance** concerns — teams need a say in **where** artifacts are stored and inference runs.

</v-clicks>

<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> **The need:** a platform that integrates AI agents into the software lifecycle, maintains traceability, and can be deployed flexibly — from managed cloud services to fully self-hosted.

</div>

<!--
Three pain points. Land the framing: the value is rigor + automation + deployment
flexibility. Cloud services (e.g. LLM inference) are used by default, but every
component can be swapped for a self-hosted equivalent when policy demands it.
-->

---
layout: default
---

# Objectives & Scope

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

**Objectives**

<v-clicks>

- A **self-hosted** platform that orchestrates AI agents for SE tasks
- A **service-based** architecture with a shared data layer for consistency
- **End-to-end type-safe** APIs (with language-agnostic OpenAPI)
- **Asynchronous** AI processing via a message broker
- **Containerized**, reproducible deployment + CI

</v-clicks>

</div>

<div>

**Scope — three V-Cycle stages**

<v-clicks>

- **SWE.1** — Software Requirements Analysis
- **SWE.4** — Software Unit Verification
- **SWE.6** — Software Qualification Testing

Plus security & safety workspaces:

- **TARA · SECO** — ISO 21434 cybersecurity
- **HARA · FMEA · FTA** — ISO 26262 functional safety

</v-clicks>

</div>

</div>

<!--
Objectives on the left, scope on the right. Stress that the AI engine itself is
an external service that consumes queued tasks — the platform orchestrates it.
-->


---
layout: section
---

# 3. System Architecture

How the platform is put together

---
layout: default
---

# Architecture — Service-Based 

<div class="grid grid-cols-5 gap-6">

<div class="col-span-3">

A **service-based architecture**: independently deployable, coarse-grained domain services over a **single shared data layer**.

```mermaid {scale: 0.52}
flowchart TD
  UI[Next.js Web App] --> GW[Angie API Gateway]
  GW --> AUTH[Auth Service]
  GW --> PROJ[Project Service]
  GW --> RES[Resource Service]
  AUTH --> DB[(PostgreSQL)]
  PROJ --> DB
  RES --> DB
  RES --> S3[(MinIO Object Storage)]
  PROJ -. async .-> MQ[[RabbitMQ]]
  MQ -. tasks .-> AI[AI Engine]
  AI -. status .-> MQ
  style GW fill:#f9996c,stroke:#c2410c,color:#0c0c0c
  style MQ fill:#f9996c,stroke:#c2410c,color:#0c0c0c
```

</div>

<div class="col-span-2">

<v-clicks>

**Why this style**

- Distributed, but far less complex/costly than full microservices
- Shared **PostgreSQL** ⇒ SQL joins, no data duplication
- Shared layer enables **end-to-end type safety**
- Gateway unifies entry; AI engine stays **external & async**

</v-clicks>

</div>

</div>

<!--
quick recap on the architecture to  the audience in the context
Pragmatic middle ground: separation of concerns at the service/API layer, but a
single shared data layer for consistency and type safety. The AI engine is
decoupled behind RabbitMQ.
-->

---
layout: section
---

# Database redesign

<!--
Farah
-->


---
layout: default
---

# Technology Stack

<div class="grid grid-cols-3 gap-6 mt-6">

<div v-click>

**Language & Runtime**

- TypeScript (full-stack)
- Bun runtime
- Shared code across FE/BE

</div>

<div v-click>

**API & Data**

- oRPC + OpenAPI contracts
- Drizzle ORM
- Zod schema validation
- Protocol Buffers (queue)

</div>

<div v-click>

**Frontend**

- Next.js (App Router)
- TanStack Query
- Tailwind CSS
- Component library

</div>

<div v-click>

**Auth & Gateway**

- JWT-based auth
- Angie gateway
- RBAC + multi-tenancy

</div>

<div v-click>

**Infra & DevOps**

- Docker Compose
- Dev Containers
- Turborepo monorepo
- GitHub Actions CI

</div>

<div v-click>

**Observability**

- Structured logging
- Centralized aggregation
- Langfuse AI tracing
- Health checks

</div>

</div>

<div v-click class="mt-6 text-sm opacity-70 text-center">
One type-safe contract from database → backend → frontend.
</div>

<!--
Khalid (TO BE REVISED)
The through-line: a single TypeScript type system, enforced at every boundary by
oRPC, Drizzle, and Zod. Protocol Buffers carry the contract across the language
boundary to the AI engine.
-->

---
layout: section
---

# 4. Service Communication

---
layout: section
---

# connectrpc & protobuf

<!--
Khalid (RENAME THE TITLE if needed)
-->

---
layout: section
---

# Overall request/response flow (SWEs BE)

<!--
Mohamed
 Discuss abstracted interaction during the flow of the request 
-->



---
layout: section
---

# 5. Platform Infrastructure & Reliability

Deployment, tooling, and observability

<!--
Khalid
-->

---
layout: default
---

<div>

- API Gateway
- JWT validation
- Secrets Manager
- Database migrations
- Logging
- Observability (Grafana - Langfuse)
- Testing strategy

</div>

<!--
Khalid
-->

---
layout: section
---

# 6. Storage & Version Management

---
layout: section
---

<!--
Mohamed
-->


---
layout: section
---

# 7. The V-Cycle Workspaces (TO BE REVISED or merged with different frontend parts)

SWE.1 · SWE.4 · SWE.6

<!-- Mariam , Salma, Omar-->

---
layout: two-cols
layoutClass: gap-8
---

# SWE.1 — Requirements Analysis

<v-clicks>

**What it does**

- Upload **system requirements** documents
- AI generates **software requirements** for each
- Status workflow: Draft → In Review → Accepted / Rejected
- Configurable attributes (ASIL, verification method, status)

</v-clicks>

::right::

<div class="mt-14" />

<v-clicks>

**Traceability**

- Each software req shows a **"refines"** link to its system req
- Click an ID to navigate the trace chain, then return
- Coverage analysis flags system reqs with **no** software reqs

</v-clicks>

<!--
Demo hook: show the collapsed system-req list, expand to reveal generated
software reqs, then click a refines link to walk the traceability chain.
-->

---
layout: two-cols
layoutClass: gap-8
---

# SWE.4 — Unit Verification

<v-clicks>

**What it does**

- Upload C/C++ code via **zip** or **GitHub import**
- Browse code in a **file tree** with inline viewing
- Trigger **unit test generation**
- Generated tests appear alongside source files

</v-clicks>

::right::

<div class="mt-14" />

<v-clicks>

**Coverage reporting**

- Line, branch, and function **coverage %**
- Real-time generation status at the top of the page
- Tests organized in the tree next to the code they verify

</v-clicks>

<!--
Demo hook: import a small C project, generate tests, then open the coverage
report tab.
-->

---
layout: two-cols
layoutClass: gap-8
---

# SWE.6 — Qualification Testing

<v-clicks>

**What it does**

- Upload requirement documents
- AI generates **test specifications**
- Specs organized **under their software requirements**
- Specs appear **incrementally** as they generate

</v-clicks>

::right::

<div class="mt-14" />

<v-clicks>

**Detail & traceability**

- Card summary → click for **full spec modal**
- Traceability matrix maps **test specs → software reqs**
- **Communication matrix** (FIBEX) validation & chunk mapping

</v-clicks>

<!--
Demo hook: upload reqs, watch specs stream in live, open a spec modal, then show
the traceability matrix tab.
-->

---
layout: default
---

# Traceability & Validation

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<v-clicks>

**Traceability Matrix**

- SWE.1: software reqs → system reqs
- SWE.6: test specs → software reqs
- End-to-end visibility, requirements → verification
- Automatic coverage gap detection

</v-clicks>

</div>

<div>

<v-clicks>

**AI Validation**

- Checks clarity, atomicity, consistency
- Flags redundancies, conflicts, ambiguities
- Suggests edits and refinements
- FIBEX communication-matrix quality report

</v-clicks>

</div>

</div>

<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> Traceability is maintained **automatically** as artifacts are generated — the core compliance pain point of the V-Cycle.

</div>

<!--
Tie back to the intro: this is the manual, error-prone work that the standards
demand and that the platform automates.
-->




---
layout: section
---

# 8. Workflow and SWE Process Improvements 

- Workflow redesign
- SWE process enhancements
<!--
Salma CHECK THE TITLE and separate the bullet points to separate slide (if needed) 
-->

---
layout: section
---

- Admin capabilities

- Validation 

- Test coverage reporting 

<!--
Mariam CHECK THE TITLE and separate the bullet points to separate slide (if needed), my opinion for Test coverage reporting is to be merged with SWE 4 as it is not a standalone feature
-->

---
layout: section
---

# Automotive Engineering Artifacts

- FIBEX generation
- Communication Matrix

<!--
Mariam CHECK THE TITLE and separate the bullet points to separate slide (if needed) 
-->

---
layout: section
---

# 9. Safety & Security

Beyond the V-Cycle

---
layout: default
---

# Cybersecurity — TARA

<div class="opacity-60 text-sm">Threat Analysis &amp; Risk Assessment · ISO/SAE 21434</div>

<div class="grid grid-cols-[0.82fr_1.18fr] gap-6 mt-4 items-start">

<div class="text-sm">

<v-clicks>

- **Full ISO/SAE 21434 chain** — assets, threat scenarios, attack paths, damage and feasibility, through to the derived **cybersecurity goals**, each stage on its own tab
- **Forward and backward trace links** relate each threat to its asset, attack path, risk and goal; selecting a link navigates to the referenced entry
- **Editable throughout**, with the full report exportable to **Excel**

</v-clicks>

</div>

<div>
  <TaraDemo />
  <div class="mt-2 text-center text-xs opacity-55 leading-relaxed">
  Switch between the three tabs, then follow a <span class="text-[#f9996c]">trace link</span> — the report navigates to the linked entry and highlights it.
  </div>
</div>

</div>

<!--
TARA workspace: the bullets are the talking points, the demo on the right is the
proof. Click a trace link live to land the "everything stays connected" point.
The analysis itself is produced by the AI engine — this is the UI.
-->

---
layout: default
---

# Cybersecurity — SECO

<div class="opacity-60 text-sm">Security Concept · ISO/SAE 21434</div>

<div class="grid grid-cols-[0.82fr_1.18fr] gap-6 mt-3 items-start">

<div class="text-sm">

<v-clicks>

- **Document-style editor** — narrative sections (introduction, scope, system description) alongside the goals and measures tables, with a **contents** sidebar
- Records cybersecurity **goals and security measures**, with **goal ↔ measure coverage** matrices relating the two
- Exports to a formatted **Word .docx** generated from a standardized template (cover page, contents and tables)

</v-clicks>

</div>

<div>
  <SecoDemo />
  <div class="mt-2 text-center text-xs opacity-55 leading-relaxed">
  Scroll the document and the <span class="text-[#f9996c]">contents</span> track the current section; selecting a section navigates to it.
  </div>
</div>

</div>

<div v-click class="mt-3 p-3 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded text-sm">
A <b>SECO</b> report can be generated from a completed <b>TARA</b> — carrying over its cybersecurity goals and system-description document — or independently, from its own uploaded inputs.
</div>

<!--
SECO workspace: bullets + the document demo side by side. Close with the link to
TARA — a SECO can build on a finished TARA or run standalone.
-->
---
layout: default
---

# Functional Safety — ISO 26262

<div class="text-sm opacity-80">
Three <b>separate</b> workspaces — but a deliberately <b>shared UI and flow</b>:
</div>

<div v-click class="mt-2 mb-5 p-3 rounded bg-gray-400/10 text-sm">
Upload → <b>scope review<span class="text-[#f9996c]">*</span></b> → AI <b>generate</b> (re-run anytime) → multi-view report → <b>export</b>
</div>

<div class="grid grid-cols-3 gap-4">

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">HARA</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">Hazard Analysis &amp; Risk Assessment</div>
  <div class="text-xs opacity-80 mt-2">A workspace to explore the hazard analysis — safety goals grouped by <b>ASIL</b> in a hierarchy view, or the full assessment as tables, with the ISO 26262 reference on hand.</div>
</div>

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">FTA</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">Fault Tree Analysis</div>
  <div class="text-xs opacity-80 mt-2">Three linked views of the fault tree — the <b>tree</b> itself, a <b>cross-ASIL</b> coverage audit, and <b>minimal cut sets</b> — to follow how failures lead to a hazard.</div>
</div>

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">FMEA</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">Failure Mode &amp; Effects Analysis</div>
  <div class="text-xs opacity-80 mt-2">An interactive <b>worksheet</b> across three views — <b>Risk Overview</b>, <b>Failure Detail</b>, and <b>Action Summary</b> — with filtering and inline review of each failure mode.</div>
</div>

</div>

<div v-click class="mt-5 text-sm opacity-70">
Shared shell across all three — dropzone, progress polling, a segmented view-toggle, and a slide-out legend / reference sheet — so only the analysis inside differs.
</div>

<div class="absolute bottom-4 left-12 right-12 text-xs opacity-55">
<span class="text-[#f9996c]">*</span> Scope review is an FTA &amp; FMEA step — HARA generates straight from the upload.
</div>

<!--
Three separate workspaces that share components, so the UI and flow feel the same.
Cards: HARA (ASIL via S×E×C, derives safety goals), FTA (cut sets + cross-ASIL),
FMEA (RPN + Action Priority). Footnotes carry the two real differences: scope
review is FTA/FMEA only, and HARA has no export.
-->

---
layout: default
---

# Functional Safety — Live View

<div class="opacity-60 text-sm">HARA, FTA and FMEA — three workspaces framed by one shared shell</div>

<div class="max-w-3xl mx-auto mt-4">
  <FusaDemo />
</div>

<!--
The demo is the argument: the workspace switcher plus the per-workspace view toggle
show three separate analyses sharing one UI. Example rows are illustrative.
-->

---
layout: section
---

# 6. DevOps & Infrastructure

Deployment, tooling, and observability

---
layout: default
---

# DevOps & Developer Experience

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

<v-clicks>

**ISO 21434 — Cybersecurity**

- **TARA** — Threat Analysis & Risk Assessment
- **SECO** — Security Concepts report generation

</v-clicks>

</div>

<div>

<v-clicks>

**ISO 26262 — Functional Safety**

- **HARA** — Hazard Analysis & Risk Assessment
- **FMEA** — Failure Mode & Effects Analysis (AIAG/VDA)
- **FTA** — Fault Tree Analysis with cut-set identification

</v-clicks>

</div>

</div>

<div v-click class="mt-8 text-sm opacity-80">

Each workspace provides **AI-assisted report generation**, structured data management, and professional **Excel export** with domain-specific formatting.

</div>

<!--
Omar
These extend the platform beyond pure V-Cycle development into the
safety/security analysis that automotive programs require alongside it.
-->


---
layout: section
---

# 10. Results

What we delivered

---
layout: default
---

# Summary of Achievements

<v-clicks>

- **Unified architecture** — service-based, clear separation of concerns over a shared PostgreSQL + MinIO data layer.
- **End-to-end type safety** — TypeScript with oRPC contracts, Drizzle schemas, and Zod validation across the whole stack.
- **Flexible deployment** — fully containerized and reproducible; runs on managed cloud services or fully self-hosted by swapping in self-hosted components.
- **Three V-Cycle stages** — SWE.1, SWE.4, SWE.6 with live status, MinIO file management, and async RabbitMQ processing.
- **Safety & security workspaces** — TARA, SECO, HARA, FMEA, FTA with AI-assisted generation and Excel export.
- **Scalability foundation** — async message queuing enabling horizontal scaling of AI workloads.

</v-clicks>

<!--
This recaps the conclusion's "Summary of Achievements." Each bullet maps to a
section the audience just saw.
-->

---
layout: center
class: text-center
---

# Conclusion & Future Work

<div class="max-w-2xl mx-auto mt-6 text-left">

<v-clicks>

- **Delivered:** a platform bringing AI agents to the automotive V-Cycle, deployable from managed cloud to fully self-hosted for control over data and inference.
- **Next:** expand testing infrastructure and CI/CD maturity.
- **Next:** continuous deployment & release management.
- **Next:** security & supply-chain hardening.
- **Next:** further V-Cycle expansion (SWE.2, SWE.3, SWE.5) and deeper safety/security analysis.

</v-clicks>

</div>

<!--
Land the plane: rigor + automation + confidentiality, with a clear path to
covering the rest of the V.
-->

---
layout: center
class: text-center
---

# Thank You

Questions & Discussion

<div class="pt-8 opacity-70 text-sm">
  <div>CairoMotive</div>
  <div>Supervised by Prof. Dr. Hazem Abbas &amp; Eng. Mahmoud Soliman</div>
</div>

<!--
Pause. Take questions one at a time.
-->

---
layout: end
hideInToc: true
---
