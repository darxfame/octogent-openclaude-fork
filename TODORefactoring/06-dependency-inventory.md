# Complete Claude Code Dependency Inventory

**Generated:** 2026-05-25
**Source:** Full codebase analysis

---

## Summary by Category

| Category | Count | Files |
|----------|-------|-------|
| ❌ MUST CHANGE | 11 | Complete rewrite/refactor required |
| ⚠️ NEEDS VERIFICATION | 3 | May work if binary compatibility established |
| ✅ CAN KEEP | 4 | UI/presentation layer only |

---

## MUST CHANGE (11 files)

### 1. `apps/api/src/claudeUsage.ts` — COMPLETE REWRITE
**Why:** All Claude-specific assumptions
- Hardcoded `which claude` lookup
- `~/.claude/.credentials.json` path
- `"Claude Code-credentials"` keychain
- `https://api.anthropic.com/api/oauth/usage`
- PTY spawning with Claude ready needle detection
- `/usage` CLI command parsing
- `scrubbedEnv()` strips `CLAUDECODE` and `ANTHROPIC_*`

### 2. `apps/api/src/claudeSessionScanner.ts` — COMPLETE REWRITE
**Why:** Path + format changes
- Hardcoded `~/.claude/projects`
- Reads project-specific JSONL files
- Parses Claude event format

### 3. `apps/api/src/terminalRuntime/claudeTranscript.ts` — COMPLETE REWRITE
**Why:** Format incompatibility
- `parseClaudeTranscript()` for Claude JSONL format
- `type: "user"` / `type: "assistant"` with `message` wrapper
- Tool names (Bash, Read, Write, Edit, Glob, Grep, Agent, WebFetch)
- `block.content`, `block.input`, `block.name` schema

### 4. `apps/api/src/terminalRuntime/hookProcessor.ts` — MAJOR REFACTOR
**Why:** Path + hook format changes
- Installs to `.claude/settings.json` → `.openclaude/settings.json`
- Hook names: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Notification`, `Stop`
- Hook payloads with `transcript_path`, `cwd`, `last_assistant_message`
- Stores turns in `.claude-turns.json`
- Claude notification types: `permission_prompt`, `idle_prompt`, `AskUserQuestion`

### 5. `apps/api/src/claudeSkills.ts` — MAJOR REFACTOR
**Why:** Path changes
- Reads from `.claude/skills`
- SKILL.md front matter parsing
- `SKILL_MARKER_START` / `SKILL_MARKER_END` blocks

### 6. `apps/api/src/startupPrerequisites.ts` — SIMPLE CHANGE
**Why:** Binary name
- `isCommandAvailable("claude")`
- Error messages reference `claude login`
- References `.claude/skills` in guidance

### 7. `apps/api/src/setupStatus.ts` — SIMPLE CHANGE
**Why:** UI text + logic
- `check-claude` setup step
- `prerequisites.availability.claude` field
- "Install Claude Code" messaging

### 8. `apps/api/src/terminalRuntime/conversations.ts` — PARTIAL REFACTOR
**Why:** File naming + format
- `.claude-turns.json` filename pattern
- `readClaudeTranscriptTurns()` assumes Claude format
- `storeClaudeTranscriptTurns()` for Claude-parsed turns

### 9. `apps/api/src/createApiServer/codeIntelRoutes.ts` — VERIFY
**Why:** May work if hooks compatible
- `/api/code-intel/events` from `PostToolUse` hook
- Falls back to `payload.session_id`

### 10. `apps/api/src/terminalRuntime/constants.ts` — SIMPLE CHANGE
**Why:** Provider name
- `DEFAULT_AGENT_PROVIDER = "claude-code"`
- `TERMINAL_BOOTSTRAP_COMMANDS["claude-code"] = "claude"`

### 11. `packages/core/src/domain/agentRuntime.ts` — SIMPLE CHANGE
**Why:** Type definition
- `TerminalAgentProvider = "codex" | "claude-code"`

---

## NEEDS VERIFICATION (3 files)

### 12. `apps/api/src/terminalRuntime/sessionRuntime.ts`
**Status:** May work if binary maps correctly
- `TERMINAL_BOOTSTRAP_COMMANDS[provider]` launches binary
- Comment: "Schedule initial prompt injection after Claude Code has had time to boot"
- AgentStateTracker state detection patterns

### 13. `apps/api/src/terminalRuntime.ts`
**Status:** May work if provider configured
- Hook installation only for `agentProvider === "claude-code"`
- Can add `openclaude` provider

### 14. `apps/api/src/createApiServer/usageRoutes.ts`
**Status:** Needs OpenClaude usage API
- Routes: `/api/claude/usage`, `/api/claude/usage/oauth`, `/api/claude/usage/cli`
- Will need new endpoints for OpenClaude

---

## CAN KEEP (4 files)

### 15. `apps/web/src/app/hooks/useClaudeUsagePolling.ts`
- Polls `/api/claude/usage`
- Degrades gracefully if no data

### 16. `apps/web/src/components/RuntimeStatusStrip.tsx`
- UI labels: "CLAUDE TOKENS/DAY"
- Only renders if data available

### 17. `apps/api/src/deck/readDeckTentacles.ts`
- Calls `readAvailableClaudeSkills()` (will need rename)
- Otherwise framework-agnostic

### 18. `apps/web/src/runtime/runtimeEndpoints.ts`
- URL construction only

---

## Key Hardcoded Values Map

| Pattern | File(s) | Change To |
|---------|---------|-----------|
| `~/.claude/` | 4 files | `~/.openclaude/` |
| `claude` binary | 3 files | `openclaude` |
| `"claude-code"` provider | 3 files | `"openclaude"` |
| `api.anthropic.com` | 1 file | Local proxy / skip |
| `Claude Code-credentials` | 1 file | Remove keychain |
| Hook names | 1 file | Same (compatible) |
| `.claude/settings.json` | 1 file | `.openclaude/settings.json` |
| `.claude/skills/` | 2 files | `.openclaude/skills/` |
| `.claude-turns.json` | 1 file | `.openclaude-turns.json` |
| `/usage` CLI cmd | 1 file | Skip / alternative |

---

## Refactoring Priority

### Phase 1: Core Infrastructure
1. `constants.ts` — Provider names
2. `agentRuntime.ts` — Type definitions
3. `startupPrerequisites.ts` — Binary detection

### Phase 2: Path-Based Changes
4. `claudeSessionScanner.ts` — Path + format
5. `claudeSkills.ts` — Path
6. `hookProcessor.ts` — Path + verify hooks

### Phase 3: Format Changes
7. `claudeTranscript.ts` — Complete rewrite
8. `conversations.ts` — Partial refactor

### Phase 4: Architecture
9. `claudeUsage.ts` — Complete rewrite (or remove)
10. `codeIntelRoutes.ts` — Verify
11. `usageRoutes.ts` — New endpoints

### Phase 5: Cleanup
- Rename files: `claude*` → `openagent*` or `provider*`
- Update all imports
- Update UI labels
- Update documentation