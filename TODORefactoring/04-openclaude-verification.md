# OpenClaude Verification Report

**Date:** 2026-05-25
**OpenClaude Version:** 0.13.0

---

## Verified Findings

### Binary & Installation
```bash
which openclaude  # /opt/homebrew/bin/openclaude
openclaude --version  # 0.13.0 (OpenClaude)
```

### Directory Structure
```
~/.openclaude/
├── settings.json        # Model/provider config
├── projects/            # Project directories (hashed names)
├── transcripts/         # Session transcripts (.jsonl)
├── skills/              # Skills directory (empty in this install)
├── session-env/         # Session environment cache
├── sessions/            # Session metadata
├── telemetry/           # Usage telemetry
├── file-history/        # File change history
├── shell-snapshots/     # Terminal snapshots
├── tasks/               # Task tracking
├── plugins/             # Plugins
├── cache/               # Cache
├── backups/             # Backups
├── paste-cache/         # Paste cache
├── plans/               # Plans
└── downloads/           # Downloads
```

### Settings.json Format
```json
{
  "env": { "NODE_TLS_REJECT_UNAUTHORIZED": "0" },
  "model": "MiniMaxAI/MiniMax",
  "provider": "openai",
  "baseURL": "http://localhost:4000/v1",
  "apiKey": "sk-proxy"
}
```

---

## CRITICAL: Transcript Format INCOMPATIBLE

### Claude Code Format (current Octogent expects):
```json
{"type": "assistant", "timestamp": "...", "message": {"role": "assistant", "content": [...], "usage": {...}}}
```

### OpenClaude Format (actual):
```json
{"type": "user", "timestamp": "...", "content": "..."}
{"type": "tool_use", "timestamp": "...", "tool_name": "read", "tool_input": {...}}
{"type": "tool_result", "timestamp": "...", "tool_name": "read", "tool_output": {...}}
```

**Impact:**
- `claudeSessionScanner.ts` expects `type === "assistant"` — **WILL NOT WORK**
- `isAssistantEvent()` will never match OpenClaude transcripts
- No `message.usage` field — usage tracking from transcripts **NOT POSSIBLE**

---

## CRITICAL: No OAuth/Keychain Usage

### Current OpenClaude Setup:
- Uses **local proxy API** (http://localhost:4000/v1)
- No Anthropic OAuth credentials
- No keychain entries found

### Impact:
- `claudeUsage.ts` uses `api.anthropic.com/oauth/usage` — **NOT APPLICABLE**
- Keychain lookup will fail
- OAuth credential parsing will fail

---

## Revised Compatibility Assessment

| Component | Status | Action Required |
|-----------|--------|-----------------|
| Binary Name | ⚠️ | Change `claude` → `openclaude` |
| Directory Structure | ✅ | Compatible |
| Transcript Format | ❌ BLOCKER | Rewrite scanner |
| Usage API | ❌ BLOCKER | Redesign strategy |
| Keychain Auth | ❌ BLOCKER | Not used by OpenClaude |
| Hook System | ❓ | Need to verify |
| Skills Format | ❓ | Need to verify (empty dir) |

---

## Major Revision Required

### Previous assumption: "Hooks/Skills compatible, only paths differ"
### Reality: **Multiple critical incompatibilities**

1. Transcript Parser must be rewritten
2. Usage Tracking cannot use Anthropic API
3. Hook System needs verification
4. Skills system needs installation test