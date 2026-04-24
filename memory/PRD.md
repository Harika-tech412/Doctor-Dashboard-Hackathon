# aegis.ai Medical Scribe — Doctor Dashboard (PRD)

## Original problem statement
Build a hackathon-grade, highly polished React desktop dashboard for a doctor, strictly following Centific branding guidelines and the AI Medical Scribe MVP. No left sidebar — bottom-nav only. Persistent AI Live Commentary panel on the right across every screen. Good-morning greeting + subtle "Nobody was watching" quote on home. Patient Module with transcript / entities / SOAP. Remove ERROR status. Optional Calendar + Scheduler.

## Architecture
- **Frontend-only React** (polished demo; no backend integrations required)
- Mock data in `/app/frontend/src/lib/mockData.js`
- Centific design tokens in `/app/frontend/src/index.css` (Poppins, `#5929d0`, `#CF008B`, pill buttons, gradient hero)
- Shell: TopBar + Main (<Outlet/>) + persistent AILiveCommentary sidebar + floating BottomNav
- Backend (`/app/backend/server.py`) kept as boilerplate (not used)

## User personas
- **Doctor (primary)** — the only MVP user. Reviews AI-drafted SOAP notes, edits, approves.

## Core requirements (static)
1. Bottom-nav only (Search + Home + Patients + Email + Downloads + Calendar + Scheduler)
2. Persistent AI Live Commentary sidebar across ALL routes with streaming feed (Transcription / Entity Extraction / SOAP / Approval / System)
3. Home with "Good {morning/afternoon/evening}" + subtle "Nobody was watching" quote
4. Patient list (6 mock sessions) with status chips — NO "Error" status
5. Patient detail: 3-pane (Transcript / Entities / SOAP) + Save/Reject/Approve + AI-disclosure banner
6. Calendar (month grid) + Scheduler (today timeline)
7. Strictly follow Centific brand (Poppins, `#5929d0` primary, `#CF008B` accent, 12px card radius, pill buttons)

## What's been implemented — Feb 12, 2026
- [x] Centific design tokens + Poppins via CDN (`index.css`)
- [x] App shell with TopBar, persistent right-side AI Live Commentary, floating bottom nav
- [x] Home page: greeting, "Nobody was watching" tagline, 4 metric cards, immediate-attention patient cards
- [x] Patient List: sortable table with search + status filters
- [x] Patient Detail: three-pane (transcript / entities / SOAP), AI-disclosure banner, Save/Reject/Approve + toasts
- [x] Email page: inbox list + detail pane
- [x] Downloads page: 5 file cards (SOAP PDFs + audit logs + reports)
- [x] Calendar page: month grid with event dots, prev/next navigation
- [x] Scheduler page: today's timeline with clickable slots
- [x] Global search overlay (patient, session id, diagnosis)
- [x] AI Live Commentary streams a new event every ~4.2s with animated entry
- [x] 100% frontend test coverage passed (testing_agent_v3 iteration_1)

## Prioritized backlog (not yet built)
- **P0**: none — MVP demo complete
- **P1**: 
  - Real audio upload + Whisper transcription pipeline
  - GPT-based entity extraction + SOAP generation
  - Session lifecycle persistence in MongoDB
- **P2**: 
  - PDF generator (jsPDF) for real downloads
  - Email delivery (Resend / SendGrid)
  - Audit-log CSV export
  - Authentication (JWT / Emergent Google Auth)

## Next tasks (recommended sequence)
1. Wire up audio upload + Whisper (requires Emergent LLM key)
2. Real-time SOAP generation via Claude/GPT (replace mock)
3. MongoDB persistence for sessions + audit log
4. Authentication layer
