# StationClaw Security Audit

**Date**: 2026-02-15
**Auditor**: EMPIRE HQ CTO (Claude Code)
**Scope**: aiquickpath (website/MCP API) + stationclaw (Electron desktop app)
**Status**: Pre-launch audit — MUST FIX before public release

---

## Executive Summary

StationClaw has **4 CRITICAL**, **6 HIGH**, and **5 MEDIUM** vulnerabilities. The most dangerous is an **IDOR (Insecure Direct Object Reference)** in the MCP tool handlers that allows any authenticated agent to modify tasks in ANY station across the entire platform. This must be fixed before any customer onboarding.

---

## CRITICAL Vulnerabilities

### C-1: IDOR — Cross-Station Task Manipulation
- **File**: `src/app/lib/mcp-tools.ts` (lines 158-173, 175-196, 140-156)
- **Tools affected**: `stationclaw_update_task`, `stationclaw_complete_task`, `stationclaw_create_task`
- **Issue**: `supabaseAdmin` bypasses ALL Row Level Security. The `update_task` and `complete_task` tools accept a raw `task_id` and update it directly — no check that the task belongs to the caller's station. `create_task` accepts a raw `project_id` with no station ownership verification.
- **Impact**: Agent A (Station X) can modify/complete/create tasks in Station Y. Full cross-tenant data manipulation.
- **Fix**: Before every write, verify the task's project belongs to `ctx.stationId`:
  ```
  // For update/complete: look up the task, check its project's station_id matches ctx.stationId
  // For create: look up the project, check station_id matches ctx.stationId
  ```
- **OWASP**: A01:2021 — Broken Access Control

### C-2: No Rate Limiting on Any Endpoint
- **Files**: `src/app/api/mcp/route.ts`, `src/app/api/auth/signup/route.ts`
- **Issue**: Zero rate limiting on signup (account creation spam), MCP calls (resource exhaustion), and health check. No middleware.ts exists.
- **Impact**: Attacker can create unlimited accounts, spam MCP calls to exhaust Supabase free tier, or brute-force API tokens.
- **Fix**: Add middleware.ts with IP-based rate limiting (e.g., Vercel KV or upstash/ratelimit). Signup: 5/hour/IP. MCP tools/call: 100/min/token. Health: 60/min/IP.
- **OWASP**: A04:2021 — Insecure Design

### C-3: No Email Verification
- **File**: `src/app/api/auth/signup/route.ts` (line 24)
- **Issue**: `email_confirm: true` in `admin.createUser()` auto-confirms the email without the user ever clicking a verification link. Anyone can sign up with any email address.
- **Impact**: Impersonation, spam accounts, fake business signups using real people's emails.
- **Fix**: Remove `email_confirm: true`. Configure Supabase Auth to require email confirmation. Add email verification step to onboarding flow.
- **OWASP**: A07:2021 — Identification and Authentication Failures

### C-4: No Security Headers
- **File**: `next.config.ts` (empty config), no `middleware.ts`
- **Issue**: No CSP, HSTS, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy headers.
- **Impact**: XSS attacks, clickjacking, MIME sniffing, man-in-the-middle on first load.
- **Fix**: Add headers to next.config.ts:
  ```
  headers: [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; ..." },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    ]
  }]
  ```
- **OWASP**: A05:2021 — Security Misconfiguration

---

## HIGH Vulnerabilities

### H-1: No Server-Side Password Validation
- **File**: `src/app/api/auth/signup/route.ts` (lines 16-17)
- **Issue**: Only checks `if (!email || !password)`. No minimum length, complexity, or common-password check. Client-side validation in onboard page is easily bypassed.
- **Impact**: Users can set password "a" or "123456".
- **Fix**: Add server-side validation: minimum 8 chars, at least 1 letter + 1 number.

### H-2: No Input Length/Sanitization Limits
- **File**: `src/app/api/auth/signup/route.ts`
- **Issue**: No max length on any field (email, password, station_name, agent_name, system_prompt). A single request could insert megabytes into the database.
- **Impact**: Storage abuse, potential DoS via oversized payloads.
- **Fix**: Enforce max lengths — email: 255, password: 128, names: 100, system_prompt: 10000.

### H-3: Electron Sandbox Disabled
- **File**: `stationclaw/src/main/main.ts` (line 21)
- **Issue**: `sandbox: false` in BrowserWindow webPreferences. This gives the renderer process more system access than necessary.
- **Impact**: If an XSS vulnerability exists in the renderer, the attacker has broader access.
- **Fix**: Set `sandbox: true` and adjust preload script if needed. Test that Supabase client still works.

### H-4: No CSP in Electron App
- **File**: `stationclaw/src/main/main.ts`
- **Issue**: No Content Security Policy set for the renderer process.
- **Impact**: Any injected script runs with full renderer privileges.
- **Fix**: Add CSP via `session.defaultSession.webRequest.onHeadersReceived` in main process.

### H-5: Realtime Subscriptions Not Station-Scoped
- **File**: `stationclaw/src/renderer/hooks/useRealtime.ts` (lines 101-118)
- **Issue**: `postgres_changes` subscription on `tasks` table has NO filter — it receives events for ALL tasks across ALL stations. The app then adds/updates them locally even if they belong to other stations.
- **Impact**: Data leakage — user sees other stations' task changes in real-time. Mitigated by RLS on initial SELECT queries, but real-time payloads bypass client-side filtering.
- **Fix**: Add filter to subscription: `filter: 'project_id=in.(id1,id2,...)'` using loaded project IDs.

### H-6: shell.openExternal Without URL Validation
- **File**: `stationclaw/src/main/main.ts` (line 31)
- **Issue**: `shell.openExternal(details.url)` opens any URL the renderer requests — no allowlist or protocol check.
- **Impact**: Malicious content could trigger `file://`, `javascript:`, or other dangerous protocol handlers.
- **Fix**: Validate URL protocol is `https://` before calling `shell.openExternal`.

---

## MEDIUM Vulnerabilities

### M-1: Token Generation Modulo Bias
- **File**: `src/app/lib/auth.ts` (line 10)
- **Issue**: `b % 62` where `b` is 0-255 creates slight bias (256 / 62 has remainder). Values 0-5 appear slightly more often.
- **Impact**: Marginally reduces token entropy from theoretical max. Not practically exploitable given 32-byte token length.
- **Fix**: Use rejection sampling or `crypto.randomUUID()` based approach.

### M-2: No Token Revocation Mechanism
- **File**: `src/app/lib/auth.ts`
- **Issue**: Once a token is generated, there's no way to invalidate it short of deleting the agent from the database.
- **Impact**: Compromised tokens remain valid forever.
- **Fix**: Add `token_revoked_at` column to agents table, or a separate `revoked_tokens` table.

### M-3: Error Messages Leak Implementation Details
- **File**: `src/app/api/mcp/route.ts` (line 82-83)
- **Issue**: `err.message` from internal errors is returned directly to the caller.
- **Impact**: Database errors, Supabase internal messages leaked to attackers.
- **Fix**: Return generic "Internal server error" to caller, log detailed error server-side.

### M-4: Agents Table select('*') Exposes Sensitive Fields
- **File**: `stationclaw/src/renderer/hooks/useRealtime.ts` (lines 90-94, 137-140)
- **Issue**: `.select('*')` on agents table returns `api_token_hash` and `system_prompt` to the client.
- **Impact**: Token hashes visible in browser DevTools. System prompts (potentially containing secrets) exposed.
- **Fix**: Use explicit column list: `.select('id, name, role, accent_color, is_online, last_seen')`.

### M-5: No CAPTCHA on Signup
- **File**: `src/app/api/auth/signup/route.ts`
- **Issue**: No bot protection on account creation.
- **Impact**: Automated account creation at scale.
- **Fix**: Add Cloudflare Turnstile or hCaptcha (free tier available).

---

## Risk Matrix

| ID | Severity | Effort to Fix | Priority |
|----|----------|---------------|----------|
| C-1 | CRITICAL | Low (1 hour) | FIX NOW |
| C-2 | CRITICAL | Medium (2-3 hours) | FIX NOW |
| C-3 | CRITICAL | Low (30 min) | FIX NOW |
| C-4 | CRITICAL | Low (30 min) | FIX NOW |
| H-1 | HIGH | Low (30 min) | Before launch |
| H-2 | HIGH | Low (30 min) | Before launch |
| H-3 | HIGH | Low (15 min) | Before launch |
| H-4 | HIGH | Medium (1 hour) | Before launch |
| H-5 | HIGH | Medium (1 hour) | Before launch |
| H-6 | HIGH | Low (15 min) | Before launch |
| M-1 | MEDIUM | Low (15 min) | Nice to have |
| M-2 | MEDIUM | Medium (1 hour) | Before paid tier |
| M-3 | MEDIUM | Low (15 min) | Before launch |
| M-4 | MEDIUM | Low (15 min) | Before launch |
| M-5 | MEDIUM | Medium (2 hours) | Before marketing push |

---

## OWASP Top 10 Coverage

| OWASP Category | Status | Findings |
|----------------|--------|----------|
| A01: Broken Access Control | FAILING | C-1 (IDOR) |
| A02: Cryptographic Failures | PASSING | SHA-256 token hashing OK |
| A03: Injection | PASSING | Supabase parameterized queries |
| A04: Insecure Design | FAILING | C-2 (no rate limiting) |
| A05: Security Misconfiguration | FAILING | C-4 (no headers), H-3 (sandbox) |
| A06: Vulnerable Components | PASSING | Dependencies up to date |
| A07: Auth Failures | FAILING | C-3 (no email verify), H-1 (weak passwords) |
| A08: Software Integrity | PASSING | Vercel handles deployments |
| A09: Logging & Monitoring | WARNING | No structured logging |
| A10: Server-Side Request Forgery | PASSING | No SSRF vectors identified |

---

## What's Already Good

- Token-based auth with SHA-256 hashing (not storing raw tokens)
- Service role key only on server-side (not exposed to client)
- Supabase RLS policies defined for all tables
- `contextIsolation: true` in Electron (default)
- Preload script has minimal API surface
- No eval() or innerHTML in renderer code
- Real-time initial data loads are properly station-scoped via SELECT queries

---

## Recommended Fix Order

1. **C-1 (IDOR)** — This is the show-stopper. One curl command can mess up anyone's station.
2. **C-4 (Headers)** — 5-minute config change, massive security improvement.
3. **C-3 (Email verify)** — Remove `email_confirm: true`, enable Supabase email confirmation.
4. **H-5 (Realtime filter)** — Prevents cross-station data leakage.
5. **M-4 (select * fix)** — Stop exposing token hashes to browser.
6. **C-2 (Rate limiting)** — Add middleware with upstash/ratelimit.
7. **H-1 + H-2 (Input validation)** — Quick server-side checks.
8. **H-3 + H-4 (Electron hardening)** — Sandbox + CSP.
9. **H-6 (URL validation)** — Protocol allowlist for openExternal.
10. **M-3 (Error messages)** — Generic errors to callers.
