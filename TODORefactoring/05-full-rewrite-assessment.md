# OpenClaude Migration - Full Rewrite Assessment

**Date:** 2026-05-25
**Version:** OpenClaude 0.13.0 vs Claude Code 2.1.x

---

## Executive Summary

**Question:** Can we rewrite everything for OpenClaude?

**Answer:** **YES, but it's a significant effort (~150-200 hours total).**

| Aspect | Assessment | Effort |
|--------|------------|--------|
| Transcript Parser | Complete rewrite | 16-24h |
| Hook Processor | Path + verify | 8-12h |
| Usage Tracking | Different architecture | 16-24h |
| Session Scanner | Path + format | 8-12h |
| Skills Manager | Need verification | 2-4h |
| Binary Detection | Simple change | 1-2h |

---

## Transcript Format Comparison

### Claude Code (current Octogent expects):
```json
{"type": "assistant", "message": {"role": "assistant", "content": [{"type": "text", "text": "..."}], "usage": {"input_tokens": 100}}}
{"type": "user", "message": {"role": "user", "content": [...]}}
```

### OpenClaude (actual):
```json
{"type": "user", "content": "...", "timestamp": "..."}
{"type": "tool_use", "tool_name": "read", "tool_input": {"file_path": "..."}}
{"type": "tool_result", "tool_name": "read", "tool_output": "..."}
{"type": "assistant", "content": "..."}
```

### Key Differences:
| Claude Code | OpenClaude |
|-------------|------------|
| Nested `message` wrapper | Flat structure |
| `message.usage` with tokens | No token data in transcript |
| `type: "assistant"` only | No `type: "assistant"` — uses `type: "user"`, `type: "tool_use"`, etc. |
| Tool results embedded | Separate `tool_use` + `tool_result` entries |

---

## Component-by-Component Analysis

### 1. Transcript Parser (`terminalRuntime/claudeTranscript.ts`)

**Current logic expects:**
- `msg.type === "assistant"` — FALSE in OpenClaude
- `msg.message?.content` — NO `message` wrapper in OpenClaude
- `msg.message.usage` — NO usage data

**Status:** MUST REWRITE
**Effort:** 16-24 hours

### 2. Hook Processor (`terminalRuntime/hookProcessor.ts`)

**Current:**
- Reads `.claude/settings.local.json` in project dir
- Uses hook response schema `{continue, suppressOutput, stopReason}`

**OpenClaude verified:**
- Project has `.openclaude/settings.local.json` ✓
- Hook events appear compatible ✓
- Response schema needs verification

**Status:** PATH CHANGE + VERIFY
**Effort:** 8-12 hours

### 3. Usage Tracking (`claudeUsage.ts`)

**Current:**
- Reads from keychain (`Claude Code-credentials`)
- Reads `~/.claude/.credentials.json`
- Calls `api.anthropic.com/oauth/usage`

**OpenClaude:**
- Uses local proxy API (`settings.json` with `baseURL` + `apiKey`)
- No keychain, no OAuth
- Telemetry exists but limited data

**Available alternatives:**
- Parse `~/.openclaude/telemetry/*.json` (limited model info)
- Query local proxy (if it exposes usage)
- Skip usage tracking

**Status:** REWRITE REQUIRED
**Effort:** 16-24 hours

### 4. Session Scanner (`claudeSessionScanner.ts`)

**Current:** `~/.claude/projects/<hash>/`
**OpenClaude:** `~/.openclaude/projects/<hash>/`

**Status:** PATH + FORMAT
**Effort:** 8-12 hours

### 5. Skills Manager (`claudeSkills.ts`)

**Current:** Reads `.claude/skills/<name>/SKILL.md`
**OpenClaude:** `~/.openclaude/skills/` (currently empty, unverified)

**Status:** NEED VERIFICATION
**Effort:** 2-4 hours

### 6. Binary Detection (`startupPrerequisites.ts`)

```typescript
isAvailable("claude") → isAvailable("openclaude")
```

**Status:** SIMPLE CHANGE
**Effort:** 1-2 hours

---

## Files Requiring Changes

### Complete Rewrite
- `terminalRuntime/claudeTranscript.ts` — 16-24h
- `claudeUsage.ts` — 16-24h

### Major Changes
- `sessionScanner.ts` — path + format — 8-12h
- `hookProcessor.ts` — path + verify — 8-12h

### Minor Changes
- `startupPrerequisites.ts` — 1-2h
- `agentStateDetection.ts` — 2-4h
- API routes check — 2-4h
- UI text updates — 4-8h

### New Architecture
- `packages/core/src/providers/` — 16-24h
- Usage alternative tracker — 16-24h

---

## Effort Summary

| Category | Hours |
|----------|-------|
| Complete Rewrite | 40h |
| Major Changes | 20h |
| Minor Changes | 15h |
| New Architecture | 40h |
| **Core Implementation** | **115h** |
| Testing | +30-40h |
| Documentation | +10-15h |
| **Total** | **155-170h** |

---

## Verification Tasks (Before Starting)

### Critical Pre-flight Checks
1. [ ] **HOOK SYSTEM** — Run live test with hooks enabled
2. [ ] **SKILLS FORMAT** — Create test skill, verify parsing
3. [ ] **HOOK RESPONSE SCHEMA** — Verify `{continue, stopReason}` works
4. [ ] **SETTINGS FORMAT** — Verify `settings.local.json` structure

### Decision Points
1. **Usage Tracking:** Skip? Local proxy? Telemetry?
2. **Compatibility:** Support both Claude Code + OpenClaude?
3. **Version:** OpenClaude 0.13.0 is beta — pin version?

---

## Recommendation

**For open-source release:**

1. **Accept limitations:**
   - No token/usage tracking (or build telemetry-based alternative)
   - OpenClaude is beta (0.x) — API may change

2. **Recommended approach:**
   - Full OpenClaude native implementation (Option A)
   - Provider abstraction only if dual-support needed

3. **Immediate next steps:**
   - Verify hook system with live test
   - Verify skills format
   - Design transcript parser for OpenClaude format
   - Decide on usage tracking strategy