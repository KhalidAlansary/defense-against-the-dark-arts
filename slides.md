---
# Deck-wide configuration. See https://sli.dev/custom/#headmatter
theme: seriph
title: "Web-based AI-powered SDLC Automation Platform"
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

# Web-based AI-powered SDLC Automation Platform

A Platform for AI-Assisted Software Engineering across the V-Cycle

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
Pragmatic middle ground: separation of concerns at the service/API layer, but a
single shared data layer for consistency and type safety. The AI engine is
decoupled behind RabbitMQ.
-->

---

# Core Components

<div class="max-w-3xl mx-auto mt-6">

| Component               | Responsibility                                       |
| ----------------------- | ---------------------------------------------------- |
| **Web App** (Next.js)   | User interface and client-side workflows             |
| **API Gateway** (Angie) | Unified entry point, JWT validation, rate limiting   |
| **Auth Service**        | Authentication, users, organizations, RBAC           |
| **Project Service**     | Projects, membership, AI request orchestration       |
| **Resource Service**    | File upload/download, storage abstraction            |
| **PostgreSQL**          | Shared relational database                           |
| **MinIO**               | Shared S3-compatible object storage                  |
| **RabbitMQ**            | Asynchronous AI task queue                           |

</div>

<!--
Walk the table top to bottom. The gateway does cross-cutting concerns so the
services stay focused. Resource service hides storage behind presigned URLs.
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
- Protobuf + ConnectRPC

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

<div class="flex gap-8 items-start">

<div id="ucl" class="w-1/2 text-left">

### Request/Response flow

- Upload files via the Resource Service.
- Store files in MinIO and metadata in the database.
- Trigger the AI pipeline through the Project Service using file IDs.
- Dispatch processing requests to AI agents via RabbitMQ.
- Receive generated results through ConnectRPC.
- Persist the results in the database.

</div>
<div id="cp" class="w-1/2 text-left">

```mermaid {scale:0.62}
%%{init: {"flowchart": {"curve":"basis","nodeSpacing":50,"rankSpacing":50}}}%%
flowchart TD

    U[User]

    PS[Project Service]
    RS[Resource Service]
    AI[AI Agents]
    MQ[RabbitMQ]
    subgraph STORAGE [Storage]
      direction LR
      M[(MinIO)]
      DB[(PostgreSQL)]
    end

    U <-->|Uploading Files| RS
    RS <--> M 
    RS -->|Store Metadata| DB 
    
    U <-->|Generation Request with required resources IDs| PS
    PS -. Events .-> MQ


    PS --> DB

    MQ -. Async Communication .-> AI
    AI -. Connect RPC .-> PS


    classDef storage fill:#e1f5fe,stroke:#000,color:#000
    classDef service fill:#f3e5f5,stroke:#000,color:#000
    classDef messaging fill:#fff3e0,stroke:#000,color:#000

    class M,DB storage
    class PS,RS service
    class MQ messaging
```

</div>
</div>

---
layout: section
---

# 5. Storage & Version Management

File Lifecycle Management using MinIO

---
layout: default
---

# Version Control

MinIO versioning allows multiple versions of the same object to coexist.


<div class="grid grid-cols-5 gap-6">

<div class="col-span-3">

### How it works

- Initial upload creates the first version
- Each update creates a new version
- Previous versions are preserved
- Every version receives a unique **Version ID**
- The most recent version is marked as **Latest**

<br/>

### Versioning Namespace

Versioning is scoped to a specific **user-project namespace**, ensuring that file versions are managed independently for each user within each project.
</div>
<div class="col-span-2">
<img
  :src="'/images/Multiple-versions.png'"
  class="rounded shadow-lg"
/>
</div>
</div>

---
layout: two-cols
---

# Object Retrieval

### Latest Version

- Returned by default
- No version ID required

<br/>

### Specific Version

- Client provides the version ID
- MinIO returns the requested revision

<br/>


### Benefits

- File history preservation
- Recovery of previous revisions
- Protection against accidental overwrites
- Traceability of changes

::right::

<div style="height:100%;display:flex;align-items:center;justify-content:flex-end">
  <img :src="'/images/retrieving-specific-version.png'" class="rounded shadow-lg" />
</div>

<!--
This is what makes the platform responsive and scalable. The protobuf contract
gives type safety even across the TS ↔ AI-engine boundary. Real-time UI feedback
comes from per-SWE conditional polling.
-->

---
layout: section
---

# Database Redesign 
A complete architectural redesign — from JSON-centric monolith to a scalable, multi-tenant, resource-centric platform.

---
layout: default
---

# The Database Was Holding Us Back.

<v-clicks>
<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> **JSON-Based Resource Storage** <br /> - Every retrieval required preprocessing to identify the resource type and extract the required fields. <br /> - Increased application complexity and reduced efficiency.

</div>
</v-clicks>

<v-clicks>
<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> **Lack of Structured Storage:**  <br /> - Artifacts had no relationships, no validation, no traceability in the database.

</div>
</v-clicks>

<v-clicks>
<div v-click class="mt-8 p-4 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded">

> **Monolithic Resource Schema:** <br /> - Supporting new artifact types required schema modifications. <br />- Large numbers of nullable columns accumulated over time. <br /> - Increased maintenance effort and risk of breaking existing functionality.

</div>
</v-clicks>

---
layout: default
---

# Resource-Centric Architecture

<div class="flex gap-6">
  <div class="flex-[8] flex flex-col gap-6">
    <div>
    A generic Resource entity was introduced to represent all engineering artifacts.
    </div>
    <div>
    <h4>Design Principles</h4>
    <b>Inheritance</b><br />
      - Common metadata defined once in the Resource entity & shared across all types<br />
      <b>Polymorphism</b><br />
      - Each artifact stores only what makes it unique.<br />
      - Different resource types are handled through a common abstraction.<br />
    </div>
    
    
  </div>

  <div class="flex-[2]">

<ZoomPanContainer title="Resource-Centric Diagram" hint="Drag to move · wheel to zoom · Esc resets" :initial-scale="0.85" :min-scale="0.45" :max-scale="2.4">

```mermaid {scale: 0.25}
erDiagram
  ORGANIZATION ||--o{ RESOURCE : owns
  PROJECT ||--o{ RESOURCE : contains
  TEAM ||--o{ RESOURCE : accesses
  RESOURCE {
      uuid id PK
      string name
      enum type
      uuid projectId FK
      string organizationId FK
      string teamId FK
  }
  MINIO_FILE_STORAGE {
      uuid id PK
      uuid resourceId FK
      int version
      bool isActive
      string objectName
  }
  USER_FILE {
      uuid id PK
      uuid minioFileId FK
  }
  CODE {
      uuid id PK
      uuid minioFileId FK
      int version
      int totalTests
      int passedTests
      int failedTests
  }
  SYSTEM_REQUIREMENT {
      uuid id PK
      uuid resourceId FK
      uuid activeVersionId FK
  }
  SYSTEM_REQUIREMENT_VERSION {
      uuid id PK
      uuid requirementId FK
      int version
      uuid previousVersionId FK
  }
  SOFTWARE_REQUIREMENT {
      uuid id PK
      uuid resourceId FK
      uuid activeVersionId FK
  }
  SOFTWARE_REQUIREMENT_VERSION {
      uuid id PK
      uuid requirementId FK
      int version
      uuid previousVersionId FK
  }
  TEST_SPEC {
      uuid id PK
      uuid resourceId FK
      uuid activeVersionId FK
  }
  TEST_SPEC_VERSION {
      uuid id PK
      uuid testSpecId FK
      int version
      uuid previousVersionId FK
  }
  RESOURCE ||--o{ MINIO_FILE_STORAGE : stores
  MINIO_FILE_STORAGE ||--o{ USER_FILE : uploaded_as
  MINIO_FILE_STORAGE ||--o{ CODE : analyzed_as
  RESOURCE ||--|| SYSTEM_REQUIREMENT : represents
  RESOURCE ||--|| SOFTWARE_REQUIREMENT : represents
  RESOURCE ||--|| TEST_SPEC : represents
  SYSTEM_REQUIREMENT ||--o{ SYSTEM_REQUIREMENT_VERSION : versions
  SOFTWARE_REQUIREMENT ||--o{ SOFTWARE_REQUIREMENT_VERSION : versions
  TEST_SPEC ||--o{ TEST_SPEC_VERSION : versions
```

</ZoomPanContainer>

  </div>
</div>

---
layout: default
---

# SaaS and Multi-Tenant Design

<div class="flex gap-6">

  <div class="flex-[6] flex flex-col gap-6">
  <p>Every entity in the database is scoped to an Organization at the schema level.<br /><br />
  <b> Logical Isolation</b><br />
  Tenant data is separated by design, not by convention.<br /><br />
  <b>Security</b><br />
  No cross-tenant data leakage enforced at the schema level.<br /><br />
  <b>SaaS Scalability</b><br />
  Add organizations without touching the core architecture.
  

  </p>


  </div>

  <div class="flex-[4] flex flex-col items-center text-center gap-4">

  <b class="text-lg font-semibold">
    Access Control Structure
  </b>

  <div class="flex flex-col items-center">
    <!-- Organization -->
    <div class="w-80 bg-[#f9996c] text-white text-center py-4 rounded-xl font-semibold text-lg">
      Organization
    </div>
    <div class="h-6 border-l-2 border-dashed border-[#fbb08f]"></div>
    <!-- Teams -->
    <div class="w-64 bg-[#fbb08f] text-white text-center py-4 rounded-xl font-semibold text-lg">
      Teams
    </div>
    <div class="h-6 border-l-2 border-dashed border-[#fcd0bd]"></div>
    <!-- Projects -->
    <div class="w-52 bg-[#fcd0bd] text-gray-900 text-center py-4 rounded-xl font-semibold text-lg">
      Projects
    </div>
    <div class="h-6 border-l-2 border-dashed border-[#fde4d7]"></div>
    <!-- Roles -->
    <div class="w-40 bg-[#fde4d7] text-gray-900 text-center py-4 rounded-xl font-semibold text-lg">
      Roles &amp; Access
    </div>
  </div>
  <span class="text-sm max-w-xs">
    Flexible ownership model for collaborative engineering environments.
  </span>

</div>

</div>

---
layout: default
---

# Versioning and History

<div class="flex gap-6">
  <div class="flex-1 flex flex-col text-sm gap-2">

  <h4>Immutable Versioning</h4>

  Instead of updating records in place, every artifact type has a dedicated version entity. Every change is recorded, every state is recoverable.

  <h4>Benefits</h4>

  <ul class="list-disc list-inside space-y-1">
    <li>Full auditability</li>
    <li>Complete history on every artifact</li>
    <li>Rollback capability</li>
  </ul>

  </div>

  <div class="flex-1 font-mono text-xs  p-2 leading-relaxed ">
  <div class= "border-solid border border-white rounded p-2 my-[25px]">
      SystemRequirement<br/>
    &nbsp;&nbsp;└── SystemRequirementVersion<br/>
    SoftwareRequirement<br/>
    &nbsp;&nbsp;└── SoftwareRequirementVersion<br/>
    TestSpec<br/>
    &nbsp;&nbsp;└── TestSpecVersion
    </div>
  </div>
</div>

<div class="mt-4">

```mermaid {scale: 0.8}
flowchart LR
    V1["V1"]
    V2["V2"]
    V3["V3\n(Current Active)"]
    V4["V4"]

    V1 -->|created before| V2
    V2 -->|created before| V3
    V3 -->|created before| V4

    V3 -. previousActiveVersion .-> V1

    classDef active fill:#f9996c,color:#fff,stroke:#f9996c;
    classDef inactive fill:#f8f8f8,color:#333,stroke:#ccc;

    class V3 active;
    class V1,V2,V4 inactive;
```

</div>

---
layout: default
---

# Traceability and Knowledge Graph Support

<div class="flex gap-8 mt-4">

  <div class="flex-[5] flex flex-col gap-4 text-sm">
    <div>
      <h4 class="text-base font-semibold mb-1">Relationship-Based Architecture</h4>
      <p>Dedicated relationship entities connect engineering artifacts.</p>
    </div>
    <div>
      <h4 class="text-base font-semibold mb-1">Can Support Knowledge Graph Integration</h4>
      <p>The same relationships used for traceability are also used by the Knowledge Graph Visualizer.</p>
      <p class="mt-2 font-semibold">Benefits:</p>
      <ul class="list-disc list-inside mt-1 space-y-1">
        <li>Single source of truth</li>
        <li>No separate graph database</li>
        <li>No data synchronization issues</li>
        <li>Real-time visualization of engineering relationships</li>
      </ul>
    </div>

  </div>

  <div class="flex-[5] flex flex-col gap-4">

```mermaid {scale: 0.5}
erDiagram
    SYSTEM_REQUIREMENT {
        UUID id
        STRING title
    }
    SOFTWARE_REQUIREMENT {
        UUID id
        STRING title
    }
    RELATIONSHIP {
        UUID id
        UUID source_id
        UUID target_id
        STRING type
    }
    SYSTEM_REQUIREMENT ||--o{ RELATIONSHIP : source
    SOFTWARE_REQUIREMENT ||--o{ RELATIONSHIP : target
```

```mermaid {scale: 0.5}
graph TD
    SR["System Requirement"]
    SW1["Software Requirement A"]
    SW2["Software Requirement B"]
    TS1["Test Spec A"]
    TS2["Test Spec B"]
    F1["FIBEX Chunk A"]
    F2["FIBEX Chunk B"]

    SR --> SW1
    SR --> SW2
    SW1 --> TS1
    SW2 --> TS2
    SW1 --> F1
    SW2 --> F2
```

  </div>

</div>

---
layout: section
---

# User Management Service

---
transition: fade-out
---

<div class="text-sm opacity-60 mb-4">Multi-tenant accounts replacing the single-account initial version</div>

<div class="grid grid-cols-2 gap-6 mt-2">

<div>

**Platform-level roles**

<v-clicks>

- Every account holds a **platform-level role** — either **Site Admin** or **User**
- A **Site Admin** has authority across the entire platform
- A **User** belongs to one or more **Organizations**

</v-clicks>

<div v-click class="mt-4 p-3 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded text-sm">
An <b>Organization</b> represents a company — it is the primary multi-tenancy boundary in the system.
</div>

</div>

<div>

**Organization-level roles**

<div v-click class="grid grid-cols-1 gap-2 mt-2 text-sm">

<div class="p-3 rounded-lg bg-gray-400/10">
  <span class="text-[#f9996c] font-semibold">Owner</span>
  <div class="text-xs opacity-80 mt-1">Full control over the organization</div>
</div>

<div class="p-3 rounded-lg bg-gray-400/10">
  <span class="text-[#f9996c] font-semibold">Org Admin</span>
  <div class="text-xs opacity-80 mt-1">Manages members and their roles within the org</div>
</div>

<div class="p-3 rounded-lg bg-gray-400/10">
  <span class="text-[#f9996c] font-semibold">Member</span>
  <div class="text-xs opacity-80 mt-1">Standard participant with scoped access</div>
</div>

<div class="p-3 rounded-lg bg-gray-400/10">
  <span class="text-[#f9996c] font-semibold">Custom Roles</span>
  <div class="text-xs opacity-80 mt-1">Configurable per organization</div>
</div>

</div>

</div>

</div>

<!--
Two role scopes: platform-level (Site Admin / User) and organization-level
(Owner / Org Admin / Member / Custom). Each user carries both. Organizations
are the multi-tenancy boundary.
-->

---

# Role-Based Access Control (RBAC)

<div class="text-sm opacity-60 mb-4">Each user's role determines exactly what actions they are authorized to perform — no more, no less.</div>

<div class="grid grid-cols-2 gap-8 mt-2">

<div>

**Site Admin** <span class="text-xs opacity-50 ml-1">platform-wide authority</span>

<v-clicks>

- Create new **organizations** on the platform
- Add **members or admins** to any organization
- Assign and modify **platform-level roles**
- Full platform-level configuration

</v-clicks>

</div>

<div>

**Org Admin** <span class="text-xs opacity-50 ml-1">organization-scoped authority</span>

<v-clicks>

- Add new **members** to their organization
- Assign and modify each member's **organization role**
- View and manage the organization's **roster**
- Cannot access or affect **other organizations**

</v-clicks>

</div>

</div>

<div v-click class="mt-6 p-3 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded text-sm">
Access is enforced at <b>API layer</b> — roles are checked on every request, not just in the UI.
</div>

<!--
RBAC: two roles, two scopes. Site Admin acts globally; Org Admin is strictly
scoped to their own organization. Enforcement is at the API layer, not the UI.
-->

---
layout: section
---

# 6. The V-Cycle Workspaces

SWE.1 · SWE.4 · SWE.6

---
layout: section
---

# Flow Redesign
From rigid wizards to flexible workspaces

---

# Application Flow — Old vs New

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**Previous Flow (v1)**

- 5-step project creation wizard
- Choose SWE stage (only SWE.6 available)
- Upload software requirements as last step
- Redirected directly to SWE.6 workspace
- Single workspace for test spec generation
- File management at project level (separate page)
- Traceability matrix in its own standalone page

</div>

<div>

**Current Flow (v2)**

- 2-step project creation: details → team members
- Redirected to **Project Overview** — central hub with V-Cycle navigation
- Inline editing of project info (name, description)
- Navigate to any SWE: **SWE.1 · SWE.4 · SWE.6**
- **Tab-based** workspaces per SWE with per-SWE file management
- Upload mandatory docs → Generate → Live status
- Traceability matrix in a tab within each SWE

</div>

</div>

<div v-click class="mt-4 p-3 border-l-4 border-[#f9996c] bg-[#f9996c]/5 rounded text-sm">

**Key shift:** Project creation is lightweight (2 steps). Document management and AI generation are now **per-SWE**, with each workspace providing its own set of tabbed views tailored to the stage.

</div>

<!--
Walk through the evolution: the old flow was rigid (5 steps, single SWE), the new
flow is flexible — lightweight project creation, a project overview hub, and
independent SWE workspaces with their own file management and AI generation.
-->

---
layout: section
---

# SWE.1 — Software Requirements Analysis

---
transition: view-switch
---

# SWE.1 — File Management

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe1" active="files" />
  </div>
</div>

<div v-click="1" style="display:none"></div>

<Transition name="slide-fade" mode="out-in" appear>
<div v-if="$slidev.nav.clicks < 1" key="upload" class="grid grid-cols-2 gap-6 mt-8">
<div class="ml-6">
  <div class="text-white font-semibold text-base">Per-SWE Document Upload</div>
  <ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
    <li>Users are prompted to upload required documents for the active SWE stage</li>
    <li>Compliance standards and supplementary files can be added via designated upload zones</li>
    <li>Files are automatically flagged with their corresponding category upon upload</li>
    <li>Required and optional uploads are clearly distinguished in the interface</li>
    <li>Mandatory documents are enforced — users cannot proceed until the required document is uploaded</li>
  </ul>
</div>
<div class="flex items-start">
  <img :src="'/images/swe1-upload-modal.png'" alt="SWE.1 document upload modal" class="w-full max-h-96 object-contain -mt-4" />
</div>
</div>
<div v-else key="file-table" class="mt-8 ml-6">
  <div class="text-white font-semibold text-base mb-3">File Table Management</div>
  <ul class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm opacity-80 mb-4 list-disc list-inside">
    <li>Files displayed in a structured table with metadata</li>
    <li>Files can be removed with a single click</li>
    <li>Additional documents can be uploaded anytime</li>
    <li>File management scoped per SWE stage</li>
  </ul>
  <img :src="'/images/swe1-project-files.png'" alt="SWE.1 project files table" class="w-full" />
</div>
</Transition>

<!--
Click 1: docs-to-be-uploaded screenshot. Click 2: switches to project-files screenshot and file-table text.
-->

---
transition: view-switch
---

# SWE.1 — Software Requirements

<div class="flex justify-center mb-1">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe1" active="software-requirements" />
  </div>
</div>

<div class="slide-enter"><SWE1Demo /></div>

<!--
Demo: collapsed list → expand to reveal generated sw reqs, then click a refines
link to walk the traceability chain. Open a card's details modal, change status,
add a review comment.
-->

---

# SWE.1 — Traceability Matrix

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe1" active="traceability" />
  </div>
</div>

<div style="animation: slide-up 0.8s ease both;">

**Per-SWE Traceability**

<ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
  <li>Maps software → system requirements with reference IDs for traceability</li>
  <li>Automatic coverage gap detection — flags system requirements missing software requirements</li>
</ul>

</div>

<div class="flex justify-center mt-6" style="animation: slide-up 0.8s ease both; animation-delay: 0.6s">
  <img :src="'/images/swe1-traceability-matrix.png'" alt="SWE.1 traceability matrix" class="w-[80%]" />
</div>

<!--
Traceability was initially a standalone page (SWE.6 only). With multiple SWEs,
each workspace has its own Traceability Matrix tab so users see the relevant
trace chain without leaving context.
-->

---
layout: section
---

# SWE.4 — Software Unit Verification

---
transition: view-switch
---

# SWE.4 — Code Upload

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe4" active="unit-tests" />
  </div>
</div>

<div class="slide-enter"><Transition name="slide-fade" mode="out-in" appear>
<div class="grid grid-cols-6 gap-4 mt-2">
<div class="col-span-2 pt-8">
  <div class="text-white font-semibold text-base">Upload Code</div>
  <ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
    <li>Upload C/C++ source code via zip or GitHub import</li>
    <li>Uploaded files appear in a file tree and can be viewed in the built-in code viewer</li>
  </ul>
</div>
<div class="col-span-4 flex items-center justify-center mt-2">
  <img :src="'/images/swe4-code-upload-modal.png'" alt="SWE.4 code upload modal" class="w-[85%]" />
</div>
</div>
</Transition></div>

---
transition: view-switch
---

# SWE.4 — Unit Tests

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe4" active="unit-tests" />
  </div>
</div>

<div class="slide-enter"><SWE4Demo startStep="generate" /></div>

---

# SWE.4 — Coverage Report

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe4" active="unit-tests-coverage" />
  </div>
</div>

<div class="flex flex-col items-start ml-6">

<div style="animation: slide-up 0.8s ease both;">

**Coverage Metrics**

<ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
  <li>Displays overall percentage of passed tests</li>
  <li>Shows line, branch, and function coverage percentages</li>
  <li>Contains detailed test results with pass/fail status for each generated test</li>
</ul>

</div>

<div class="flex justify-center mt-8" style="animation: slide-up 0.8s ease both; animation-delay: 0.6s">
  <img :src="'/images/swe4-test-coverage-report.png'" alt="SWE.4 test coverage report" class="w-[80%]" />
</div>

</div>

<!--
Demo: generate tests, switch to the Tests Coverage Report tab to see coverage
metrics, then open the file tree to browse generated tests.
-->

---
layout: section
---

# SWE.6 — Software Qualification Testing

---
transition: view-switch
---

# SWE.6 — File Management

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe6" active="files" />
  </div>
</div>

<div v-click="1" style="display:none"></div>

<Transition name="slide-fade" mode="out-in" appear>
<div v-if="$slidev.nav.clicks < 1" key="upload" class="grid grid-cols-2 gap-6 mt-8">
<div class="ml-6">
  <div class="text-white font-semibold text-base">Per-SWE Document Upload</div>
  <ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
    <li>Users are prompted to upload required documents for the active SWE stage</li>
    <li>Compliance standards and supplementary files can be added via designated upload zones</li>
    <li>Files are automatically flagged with their corresponding category upon upload</li>
    <li>Required and optional uploads are clearly distinguished in the interface</li>
    <li>Mandatory documents are enforced — users cannot proceed until the required document is uploaded</li>
  </ul>
</div>
<div class="flex items-start">
  <img :src="'/images/swe6-upload-modal.png'" alt="SWE.6 document upload modal" class="w-full max-h-96 object-contain -mt-4" />
</div>
</div>
<div v-else key="file-table" class="mt-8 ml-6">
  <div class="text-white font-semibold text-base mb-3">File Table Management</div>
  <ul class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm opacity-80 mb-4 list-disc list-inside">
    <li>Files displayed in a structured table with metadata</li>
    <li>Files can be removed with a single click</li>
    <li>Additional documents can be uploaded anytime</li>
    <li>File management scoped per SWE stage</li>
  </ul>
  <img :src="'/images/swe6-project-files.png'" alt="SWE.6 project files table" class="w-full" />
</div>
</Transition>

<!--
Click 1: docs-to-be-uploaded screenshot. Click 2: switches to project-files screenshot and file-table text.
-->

---
transition: view-switch
---

# SWE.6 — Test Specifications

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe6" active="test-specs" />
  </div>
</div>

<div class="slide-enter"><SWE6Demo /></div>

<!--
Demo: click generate, test specs appear streamed in.
-->

---

# SWE.6 — Traceability Matrix

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe6" active="traceability" />
  </div>
</div>

<div style="animation: slide-up 0.8s ease both;">

**Per-SWE Traceability**

<ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
  <li>Maps test specifications → software requirements with reference IDs for traceability</li>
  <li>Automatic coverage gap detection — flags requirements missing test specifications</li>
</ul>

</div>

<div class="flex justify-center mt-6" style="animation: slide-up 0.8s ease both; animation-delay: 0.6s">
  <img :src="'/images/swe6-traceability-matrix.png'" alt="SWE.6 traceability matrix" class="w-[80%]" />
</div>

<!--
Same evolution story as SWE.1: the traceability matrix was a standalone page,
now it's a contextual tab within each SWE workspace.
-->

---
transition: view-switch
---

# SWE.6 — Communication Matrix

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe6" active="communication-matrix" />
  </div>
</div>

---
transition: view-switch
---

# SWE.6 — Requirement Validation

<div class="flex justify-center mb-3">
  <div @click="$slidev.nav.next()" class="cursor-pointer inline-block">
    <SWEPills swe="swe6" active="validation" />
  </div>
</div>

---
layout: section
---

# 6. Safety & Security

Extending the platform's scope — ISO 21434 & ISO 26262

---

# Cybersecurity — TARA

<div class="opacity-60 text-sm">Threat Analysis &amp; Risk Assessment · ISO/SAE 21434</div>

<div class="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-4 text-xs">
  <span class="px-2 py-1 rounded bg-white/5 border border-white/10">Upload</span>
  <span class="opacity-40">→</span>
  <span class="px-2 py-1 rounded bg-white/5 border border-white/10">Validate <span class="opacity-50">· required sections</span></span>
  <span class="opacity-40">→</span>
  <span class="px-2 py-1 rounded bg-white/5 border border-white/10">Configure <span class="opacity-50">· detects ECU, suggests defaults</span></span>
  <span class="opacity-40">→</span>
  <span class="px-2 py-1 rounded bg-[#f9996c]/15 border border-[#f9996c]/30 text-[#f9996c] font-medium">you edit</span>
  <span class="opacity-40">→</span>
  <span class="px-2 py-1 rounded bg-white/5 border border-white/10">Generate</span>
</div>

<div class="mt-2 text-xs opacity-55 leading-relaxed">
Validation, configuration and generation are each an AI request, run as a <b>chain</b> — the engineer reviews and edits the configs in between.
</div>

<div class="grid grid-cols-[0.82fr_1.18fr] gap-6 mt-3 items-start">

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
TARA workspace: the starter step bar is the human-in-the-loop chained flow —
validation gate (required sections, pass/fail), then ECU-specific configs the
user edits, then AI generation. Bullets + demo are the resulting report. The
analysis is produced by the AI engine; this is the UI and the workflow around it.
-->

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

# Functional Safety — ISO 26262

<div class="text-sm opacity-80">
Three <b>separate</b> workspaces — but a deliberately <b>shared UI and flow</b>:
</div>

<div v-click class="mt-2 mb-5 p-3 rounded bg-gray-400/10 text-sm">
Upload → <b>scope review<span class="text-[#f9996c]">*</span></b> → <b>generate</b> (re-run anytime) → multi-view report → <b>export</b>
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
layout: default
---

# Cross-Service Communication

<div class="text-sm opacity-80 mb-3">The <b>platform backend</b> (TypeScript) and the <b>AI backend</b> (Python) speak different languages — the stack is chosen for a <b>type-safe contract</b> across that boundary.</div>

<div class="flex justify-center mb-3">

```mermaid {scale: 0.45}
flowchart LR
  S["Schema · .proto"]
  S -- "generate" --> TS["Platform backend<br/>typed client (TS)"]
  S -- "generate" --> PY["AI backend<br/>typed client (Python)"]
  style S fill:#f9996c,stroke:#c2410c,color:#0c0c0c
```

</div>

<div class="grid grid-cols-3 gap-4 text-sm">

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">Protocol Buffers</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">The contract</div>
  <div class="text-xs opacity-80 mt-2">One language-neutral schema as the single source of truth — generated into typed clients for both backends, giving <b>compile-time safety</b> across the language boundary. Versioned and backward-compatible.</div>
</div>

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">ConnectRPC</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">Synchronous calls</div>
  <div class="text-xs opacity-80 mt-2">Server and client are generated from that same schema and run over ordinary <b>HTTP/1.1</b> — no hand-written REST glue or manual validation, and no drift between the two services.</div>
</div>

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold">Message broker</div>
  <div class="text-[10px] uppercase tracking-wide opacity-50">Asynchronous jobs</div>
  <div class="text-xs opacity-80 mt-2">AI generation is long-running, so it's <b>decoupled</b> behind a queue: jobs survive restarts, retry on failure, and let AI workers <b>scale out</b> — the platform never blocks on a request.</div>
</div>

</div>

<div v-click class="mt-4 text-sm opacity-70 text-center">
Why not plain REST / JSON? With two different-language backends, a schema-first generated contract removes a whole class of integration bugs.
</div>

<!--
This slide is about the technology decisions, not the request flow. Three
choices: (1) Protocol Buffers as a language-neutral, schema-first contract
generated for both backends — compile-time safety across TypeScript and Python.
(2) ConnectRPC for synchronous calls, generated from that same schema, over
plain HTTP/1.1. (3) a message broker for long-running AI jobs, so the platform
stays responsive and AI workers scale independently. The thread: one schema, no
drift, fewer integration bugs.
-->

---
layout: section
---

# 8. DevOps & Infrastructure

Deployment, tooling, and observability

---

# Secrets Management

<div class="text-sm opacity-80 mb-4">Two layers, split by audience — runtime infrastructure creds vs. developer & app secrets.</div>

<div class="grid grid-cols-2 gap-6">

<div>

**Runtime — Docker Compose secrets**

<v-clicks>

- Mounted as **files** at `/run/secrets/…` — never baked into images or env
- Postgres, MinIO, and Better-Auth credentials
- Services read them via the `*_FILE` convention

</v-clicks>

</div>

<div>

**Dev & app — OpenBao + varlock**

<v-clicks>

- LLM-provider keys live in a central **OpenBao** server
- `varlock` resolves `vaultSecret()` placeholders at **command runtime** — never written to disk
- `bao login` authenticates each developer

</v-clicks>

</div>

</div>

<div v-click class="mt-5 flex justify-center">

```mermaid {scale: 0.62}
flowchart LR
  S[".env.schema<br/>KEY = vaultSecret()"]
  B[("OpenBao")]
  V{{"varlock run"}}
  A["Process env<br/>(runtime only)"]
  S --> V
  B -- "secret value" --> V
  V -- "injected · never on disk" --> A
  style B fill:#f9996c,stroke:#c2410c,color:#0c0c0c
  style V fill:#f9996c,stroke:#c2410c,color:#0c0c0c
```

</div>

<!--
Two distinct mechanisms the deck used to lump together. Compose secrets handle
the infra credentials at runtime as mounted files. OpenBao + varlock distribute
the LLM keys to developers: the .env.schema only declares vaultSecret(), and
varlock pulls the real value from OpenBao when a command runs — nothing sensitive
is ever written to disk.
-->

---
layout: default
---

# API Gateway & Edge — Angie

<div class="text-sm opacity-80 mb-3">A single <b>Angie</b> config is the platform's front door — three jobs at the edge:</div>

<div class="grid grid-cols-3 gap-3 text-sm">
  <div class="p-3 rounded-lg bg-gray-400/10"><span class="text-[#f9996c] font-semibold">Reverse proxy</span><div class="opacity-80 text-xs mt-1">Path-based routing to the auth, project, resource, traceability &amp; storage upstreams</div></div>
  <div class="p-3 rounded-lg bg-gray-400/10"><span class="text-[#f9996c] font-semibold">TLS via ACME</span><div class="opacity-80 text-xs mt-1">Built-in Let's Encrypt client auto-issues &amp; renews certs — no certbot sidecar</div></div>
  <div class="p-3 rounded-lg bg-gray-400/10"><span class="text-[#f9996c] font-semibold">JWT validation</span><div class="opacity-80 text-xs mt-1">Built-in module verifies signatures at the edge — bad tokens never reach a service</div></div>
</div>

<div class="mt-4 flex justify-center">

```mermaid {scale: 0.5}
flowchart LR
  Client(("Client"))
  subgraph A["Angie · edge"]
    TLS["ACME TLS<br/>auto-renew"]
    JWT["auth_jwt<br/>verify signature"]
  end
  Client -- HTTPS --> A
  A -. "JWKS by kid · cached" .-> AUTH["Auth Service"]
  A --> P["Project"]
  A --> R["Resource"]
  A --> T["Traceability"]
  A --> W["Web"]
  style A fill:#f9996c,stroke:#c2410c,color:#0c0c0c
```

</div>

<div v-click class="mt-3 text-xs opacity-70">
The JWKS signing keys are fetched once and cached (keyed by the token's <code>kid</code>), so per-request validation adds no round-trip to the auth service.
</div>

<!--
Angie (an nginx fork) does three things from one config. Reverse proxy: routes
/api/* to the right service. ACME: the built-in Let's Encrypt client issues and
renews TLS certs automatically. JWT: the built-in auth_jwt module validates the
token signature at the edge using the auth service's JWKS, cached by kid so
there's no per-request lookup. Unauthenticated routes (login, JWKS) stay open.
-->

---
layout: default
---

# Quality Gates & Deployment

<div class="text-xs opacity-60 mb-2">Two automated PR checks post their results straight onto the pull request:</div>

<div class="grid grid-cols-2 gap-5">

<div>

<div class="text-[#f9996c] font-semibold text-sm">AI Pipeline Preview</div>
<div class="text-xs opacity-80 mt-1 mb-2">Runs the <b>real pipeline</b> on a fixed sample requirements doc against the live LLM, then <b>upserts a bot comment</b> — reviewers see the <b>behavioural change</b>, not just the code diff.</div>

<div v-click class="rounded-lg border border-gray-500/30 bg-gray-400/5 text-xs overflow-hidden">
  <div class="px-3 py-1.5 bg-gray-400/15 flex items-center gap-2">
    <span>🤖</span><span class="font-semibold">github-actions</span><span class="opacity-50">bot · pipeline preview · example</span>
  </div>
  <div class="px-3 py-2">
    <div class="opacity-70">Sample input: <code>reqTest2.docx</code></div>
    <div class="mt-1"><b>12</b> specs · <b>7</b> requirements · <b>5</b> techniques · <b>38</b> steps</div>
    <div class="font-mono text-[10px] opacity-80 mt-2 leading-relaxed">
      | Test Case ID | Tested Req IDs | Objective | … |<br/>
      | TS-001 | SR-3, SR-7 | Verify boundary handling | … |<br/>
      | TS-002 | SR-4 | Reject malformed CAN frame | … |
    </div>
  </div>
</div>

</div>

<div>

<div class="text-[#f9996c] font-semibold text-sm">Contract Checks · Buf</div>
<div class="text-xs opacity-80 mt-1 mb-2">On any <code>.proto</code> change, <b>Buf</b> lints the contract for best practices and detects <b>breaking changes</b> vs. the base branch — so the shared contract can't silently break either backend.</div>

<div v-click class="rounded-lg border border-gray-500/30 bg-gray-400/5 text-xs overflow-hidden">
  <div class="px-3 py-1.5 bg-gray-400/15 flex items-center gap-2">
    <span>🤖</span><span class="font-semibold">buf</span><span class="opacity-50">bot · contract checks · example</span>
  </div>
  <div class="px-3 py-2">
    <div class="opacity-70 mb-2">Latest Buf results for this PR</div>
    <table class="w-full text-[10px] text-center border-collapse [&_th]:border [&_td]:border [&_th]:border-gray-500/20 [&_td]:border-gray-500/20 [&_th]:py-0.5 [&_td]:py-0.5">
      <thead class="opacity-60"><tr><th>Build</th><th>Format</th><th>Lint</th><th>Breaking</th></tr></thead>
      <tbody><tr><td>✅ passed</td><td>✅ passed</td><td>✅ passed</td><td class="text-red-400">❌ failed</td></tr></tbody>
    </table>
  </div>
</div>

</div>

</div>

<div class="grid grid-cols-2 gap-4 mt-4">

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold text-sm">Tests on real infrastructure</div>
  <div class="text-xs opacity-80 mt-1">Integration & e2e run against a <b>real Postgres</b> and the gateway in CI — not mocks. A factory + <b>LIFO cleanup registry</b> isolates each test; <b>Turbo <code>--affected</code></b> runs only what changed.</div>
</div>

<div v-click class="p-3 rounded-lg bg-gray-400/10">
  <div class="text-[#f9996c] font-semibold text-sm">Migrations gate deploys</div>
  <div class="text-xs opacity-80 mt-1">A <b>db-migrate</b> container applies Drizzle's <b>versioned SQL</b> on every deploy; services boot only <b>after it succeeds</b> — schema changes ship as code.</div>
</div>

</div>

<!--
The headline is the AI Pipeline Preview workflow (pr-pipeline-comment.yml). LLM
output is non-deterministic, so a normal "assert equals" test doesn't fit. Instead,
every PR runs the actual pipeline end-to-end on a canonical requirements doc against
the real LLM, then posts/updates ONE bot comment containing summary stats and the
full generated test-spec table. Reviewers eyeball the behavioural impact of a change,
and the raw output is also uploaded as a CI artifact. Second top card: Buf
(bufbuild/buf-action) lints the shared .proto contract for best practices and detects
breaking changes vs. the base branch, posting a build/format/lint/breaking status
table onto the PR so the contract can't silently break either backend. The mock
shows the gate doing its job — a breaking change caught, blocking the merge. Both
mock comments show illustrative example data. Bottom row: integration/e2e on real Postgres
+ gateway (not mocks), and the db-migrate gate on deploy. Footer: generic
linters/type-checks exist but aren't the interesting part.
-->

---
layout: default
---

# Observability — Logs, Traces & Profiling

<div class="grid grid-cols-2 gap-6">

<div>

**Structured logs → one pipeline**

<v-clicks>

- **pino** (TS) + **structlog** (Python) emit **JSON to stdout**
- **Alloy** discovers containers via the Docker socket and relabels by service
- Ships to **Loki**, explored in **Grafana** — apps ship nothing themselves

</v-clicks>

<div v-click class="mt-3">
  <img :src="'/images/grafana-logs-screenshot.png'" class="rounded border border-gray-500/20" />
</div>

</div>

<div>

**AI-specific observability**

<v-clicks>

- **Langfuse** — a LangChain callback traces every nested LLM call; `request_id` groups one run into a single session
- **pyinstrument** — opt-in wall-clock profiler, one HTML report per message, to find slow pipeline stages

</v-clicks>

<div v-click class="mt-3">
  <img :src="'/images/langfuse-screenshot.webp'" class="rounded border border-gray-500/20" />
</div>

</div>

</div>

<!--
Two halves. Platform logs: pino and structlog both write JSON to stdout; Alloy
collects from the Docker socket, labels by service, and pushes to Loki for
Grafana — no log shipping in the apps. AI observability: Langfuse traces the LLM
calls of a generation run (grouped by request_id), and pyinstrument profiles a
message end-to-end when enabled, writing an HTML flame report.
-->

---
layout: section
---

# 9. Results

What we delivered

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
