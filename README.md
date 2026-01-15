# 📌 SRM Event Management System — Current Status

**Repository:** `vickydecodes/SRM-Event-Management-System`  
**Tech Stack:** JavaScript (React frontend + Node.js backend) + CSS + TypeScript (partial) + HTML  
**Activity:** 1 commit (initial boilerplate)
[Full document of the access control among the system → ACCESS.md](./ACCESS.md)
---

## 🧱 What’s Been Pushed (Initial Boilerplate Commit)

This commit establishes the foundational full-stack scaffolding for a scalable Event Management System. The structure is modular, clean, and ready for feature development.

### 🟢 Backend (`backend/`)

Contains a professional Node.js/Express-style structure:

- **Environment**  
  `.env`, `.env.example`

- **API Layer** (`src/api/`)  
  Controllers, Routes, Validators

- **Core Layer** (`src/core/`)  
  Services, Error handling, Middlewares, Utilities

- **Database Layer** (`src/database/`)  
  Models, Migrations

- **Lib & Tools** (`src/lib/`)  
  Utility scripts, Postman collections, etc.

- **Entry Point**  
  `server.ts`

**Role:** Complete blueprint for building secure, validated REST APIs. No business logic yet — all scaffolding in place.

### 🔵 Frontend (`frontend/`)

Vite + React + TypeScript setup with modular architecture:

- Base Vite + React configuration
- Reusable UI components (`components/ui/`)
- Feature modules (`modules/`)
- Core utilities (API client, contexts, routing)
- Role-based page structure (Admin, Staff, Student dashboards, etc.)

**Role:** Ready-to-extend UI shell with component library and role-based navigation. Not yet connected to backend.

### 📦 Root Level

- `.gitignore`
- Root `package.json`, `tsconfig.json`
- Docker configuration (placeholder)
- Project structure trees (`project.tree`, `new.tree`)

---

## 🧠 Project Overview

This is a **multi-role event management platform** foundation with:

- Clear separation of concerns (frontend/backend)
- Modular, scalable architecture
- Role-based access in mind (Admin, Staff, Student/Participant)
- Prepared paths for future features:
  - Event CRUD operations
  - Registration & attendance tracking
  - Permission systems
  - Dashboards & analytics

**Current State:** Structural boilerplate only — no functional features implemented yet.

---

## 🗂 Next Milestones (Short Term)

Before implementing core product logic:

1. **Design Core Domain Models**  
   - Event  
   - Venue  
   - Participant  
   - Registration  
   - Organizer/User roles

2. **Implement REST API Endpoints & Services**  
   - Event CRUD (create, list, update, delete)  
   - Registration flow logic

3. **Connect Frontend to Backend**  
   - Authentication integration  
   - API client setup (Axios/instance)  
   - Protected routes & role guards

4. **Build Basic UI Flows**  
   - Login / Signup pages  
   - Event listing & details  
   - Registration form

5. **Add Testing Foundation**  
   - Backend: unit + integration tests  
   - Frontend: component + e2e smoke tests

---

## 🎯 Commit Requirements (Team Standard)

To maintain a professional, readable history for portfolio and collaboration:

**Before every commit, you must:**

- 🔎 Review all changes
- 🧾 Write a clear, structured commit message using this template:


**Allowed Commit Types:**

- `feat(...)` — New feature
- `fix(...)` — Bug fix
- `refactor(...)` — Code restructuring (no behavior change)
- `chore(...)` — Tooling, config, cleanup
- `docs(...)` — Documentation updates
- `test(...)` — Adding or updating tests


---

## 📝 Development Rules (Enforced)

- Only work on the explicitly assigned task — no unsolicited features or refactoring
- Notify me before every commit (summary of changes + proposed message)
- Push only meaningful, valuable commits (no "wip" or broken state)
- Always use structured commit messages as defined above
- Keep this status markdown file updated with progress after major milestones

---

**Last Updated:** December 17, 2025  
**Status:** Boilerplate complete — ready for domain modeling & feature development