# OpenClaude Replacement Research

**Date:** 2026-05-25
**Author:** Atlas (AI PM)

## Executive Summary

**Can OpenClaude fully replace Claude Code?** Yes, with modifications.

OpenClaude provides:
- Identical hooks API
- Identical skills system
- Similar settings.json format
- Same CLI patterns

Required changes are primarily path/config migrations.

---

## Compatibility Matrix

| Component | Claude Code | OpenClaude | Status |
|-----------|-------------|------------|--------|
| **Hook Events** | SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop, Notification, Setup, SubagentStart, TaskCompleted, etc. | **IDENTICAL** | ✅ Full |
| **Settings.json** | `.claude/settings.json` | `.openclaude/settings.json` | ✅ |
| **Skills Format** | `.claude/skills/<name>/SKILL.md` | `.openclaude/skills/<name>/SKILL.md` | ✅ |
| **Hook Response Schema** | `{continue, suppressOutput, stopReason}` | **IDENTICAL** | ✅ |
| **Hook Configuration** | `{hookEvent, matcher, hookCommand}` | Same format | ✅ |
| **Config Home** | `~/.claude/` | `~/.openclaude/` | ⚠️ Path |
| **Projects Dir** | `~/.claude/projects/` | `~/.openclaude/projects/` | ⚠️ Path |
| **Skills Dir** | `.claude/skills/` | `.openclaude/skills/` | ⚠️ Path |
| **Keychain Service** | `Claude Code-credentials` | Different name | ⚠️ |
| **Credentials File** | `~/.claude/.credentials.json` | `~/.openclaude/credentials.json` | ⚠️ |
| **Binary Name** | `claude` | `openclaude` | ⚠️ |
| **Hook-Chains** | Not supported | `.openclaude/hook-chains.json` | ✨ Enhancement |

---

## OpenClaude Features Reference

### Hook Events (identical to Claude Code)
```
SessionStart, Setup, CwdChanged, FileChanged,
PreToolUse, PostToolUse, PostToolUseFailure,
UserPromptSubmit, Notification, Stop, StopFailure,
SubagentStart, SubagentStop, PreCompact, PostCompact,
PermissionRequest, PermissionDenied,
TeammateIdle, TaskCreated, TaskCompleted,
Elicitation, ElicitationResult, ConfigChange,
WorktreeCreate, WorktreeRemove, InstructionsLoaded
```

### Hook Response Schema
```typescript
{
  continue?: boolean,      // default: true
  suppressOutput?: boolean, // default: false
  stopReason?: string,
  updatedMCPToolOutput?: unknown  // for PostToolUse
}
```

### Hook Configuration Format
```typescript
{
  hookEvent: "SessionStart" | "UserPromptSubmit" | ...,
  matcher?: { prompt?: string, args?: string[], toolName?: string },
  hookCommand: string  // absolute path or command
}
```

### Skills Format
```
<skill-dir>/
├── SKILL.md  # with frontmatter (name, description)
└── ...       # supporting files
```

---

## Files Requiring Changes

### High Priority (Direct Path Dependencies)

1. **`apps/api/src/startupPrerequisites.ts`**
   - `isCommandAvailable("claude")` → `isCommandAvailable("openclaude")`

2. **`apps/api/src/claudeSessionScanner.ts`**
   - `~/.claude/projects/` → `~/.openclaude/projects/`
   - Rename to `openagentSessionScanner.ts`

3. **`apps/api/src/claudeUsage.ts`**
   - `~/.claude/.credentials.json` → `~/.openclaude/credentials.json`
   - Keychain service name
   - API endpoint check

4. **`apps/api/src/claudeSkills.ts`**
   - `.claude/skills/` → `.openclaude/skills/`
   - Rename to `openagentSkills.ts`

5. **`apps/api/src/terminalRuntime/hookProcessor.ts`**
   - Hook response parsing (likely compatible)
   - Hook configuration reading (check paths)

### Medium Priority (Type/Naming References)

6. **`apps/api/src/agentStateDetection.ts`**
   - Binary name references

7. **API Routes (`apps/api/src/createApiServer/`)**:
   - `codeIntelRoutes.ts` - may reference "claude"
   - Check all route handlers

### Low Priority (Documentation/Tests)

8. **Documentation updates**
9. **Test file updates**
10. **Package naming**

---

## Unknown Items (Need Verification)

1. **OAuth/Usage API**
   - Does OpenClaude have `/oauth/usage` endpoint?
   - What API does it use for billing?

2. **Memory System**
   - `~/.claude/memories/` → `~/.openclaude/memories/`?
   - Auto-memory configuration?

3. **Telemetry**
   - Does OpenClaude collect/analyze usage?

4. **Remote Sessions**
   - `CLAUDE_CODE_REMOTE` behavior?

---

## Migration Strategy

### Option A: Provider Abstraction (Recommended)
Create provider-agnostic layer:
```typescript
// packages/core/src/providers/
├── types.ts           # AgentProvider interface
├── claude.ts          # Claude Code implementation
└── openclaude.ts      # OpenClaude implementation

// Configuration
interface AgentProvider {
  binaryName: string
  configHome: string   // ~/.claude or ~/.openclaude
  projectsDir: string
  skillsDir: string
  keychainService: string
  credentialsFile: string
  // ...
}
```

### Option B: Direct Migration
Replace all paths directly for OpenClaude only.

**Recommendation**: Option A allows supporting both Claude Code and OpenClaude, enabling gradual migration.

---

## Verification Commands

```bash
# Check OpenClaude availability
which openclaude

# Check OpenClaude config
ls -la ~/.openclaude/

# Check OpenClaude projects
ls -la ~/.openclaude/projects/

# Check OpenClaude skills
ls -la ~/.openclaude/skills/

# Check OpenClaude settings
cat ~/.openclaude/settings.json
```

---

## References

- OpenClaude GitHub: https://github.com/Gitlawb/openclaude
- OpenClaude Docs: https://docs.openclaude.ai
- Hook-Chains: https://docs.openclaude.ai/hook-chains
- Settings Reference: https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/claude-code-settings.json