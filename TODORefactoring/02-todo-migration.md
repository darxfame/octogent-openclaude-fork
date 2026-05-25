# OpenClaude Migration TODO

**Status:** Planned (MAJOR REVISION NEEDED)
**Target:** Replace Claude Code dependency with OpenClaude
**Branch:** `feature/openclaude-migration`
**Version Checked:** OpenClaude 0.13.0 installed and verified

> ⚠️ **CRITICAL REVISION REQUIRED** — Initial research was incomplete. See `04-openclaude-verification.md` for details.

---

## REVISED Assessment

### Previous Assumption
> "Hooks/Skills compatible, only paths differ"

### Reality
| Component | Initial Assessment | Actual |
|-----------|-------------------|--------|
| Transcript Format | ✅ Compatible | ❌ **DIFFERENT** — needs parser rewrite |
| Usage API | ⚠️ Unknown | ❌ **NOT APPLICABLE** — OpenClaude uses local proxy, no Anthropic OAuth |
| Keychain Auth | ⚠️ Unknown | ❌ **NOT USED** — OpenClaude uses settings.json with API key |
| Hook System | ✅ Compatible | ❓ **NOT VERIFIED** — need live test |
| Skills | ✅ Compatible | ❓ **NOT VERIFIED** — skills dir empty |

### Blocking Issues
1. **Transcript Parser** — needs complete rewrite for new format
2. **Usage Tracking** — cannot use Anthropic API; need alternative
3. **Auth Model** — different (API key vs OAuth)

---

## Phase 0: OpenClaude Verification (REQUIRED BEFORE PHASE 1)

### 0.1 Verify Hook System Compatibility

**Why:** Hook API signature matches Claude Code, but actual behavior needs testing.

**Test Plan:**
1. Create test project with `settings.json` containing a test hook
2. Run OpenClaude session that should trigger hook
3. Verify hook fires and receives expected payload
4. Verify hook response is processed correctly

**Files to check:**
- `~/.openclaude/settings.json` — current settings
- Hook chain configuration format

**Status:** ⬜ TODO

### 0.2 Verify Skills System

**Why:** Skills directory is empty; format not confirmed.

**Test Plan:**
1. Create test skill in `~/.openclaude/skills/test/`
2. Verify skill appears in OpenClaude
3. Verify SKILL.md format compatibility

**Status:** ⬜ TODO

### 0.3 Determine Usage Tracking Strategy

**Why:** Anthropic OAuth API not applicable; OpenClaude uses local proxy.

**Options:**
1. **Skip usage tracking** — OpenClaude doesn't have equivalent
2. **Parse telemetry directory** — `~/.openclaude/telemetry/` may contain data
3. **Local API proxy** — query the local proxy for usage (if it provides)
4. **Custom tracking** — instrument the proxy ourselves

**Decision:** ⬜ PENDING

**Status:** ⬜ TODO

---

---

## Phase -1: Core Type Changes

### Constants & Types

**Files:**
- `apps/api/src/terminalRuntime/constants.ts`
- `packages/core/src/domain/agentRuntime.ts`

**Changes:**
- `DEFAULT_AGENT_PROVIDER = "claude-code"` → `"openclaude"`
- `TERMINAL_BOOTSTRAP_COMMANDS["claude-code"]` → `"openclaude"`
- `TerminalAgentProvider` type add `"openclaude"`

**Status:** ⬜ TODO
**Effort:** 1-2h

---

## Phase 1: Provider Abstraction Layer

### 1.1 Create Provider Types

**File:** `packages/core/src/providers/types.ts`

```typescript
export interface AgentProvider {
  /** Binary name (claude or openclaude) */
  binaryName: string

  /** Config home directory (~/.claude or ~/.openclaude) */
  configHome: string

  /** Projects directory for session transcripts */
  projectsDir: string

  /** Skills directory */
  skillsDir: string

  /** Keychain service name for credentials */
  keychainService: string

  /** Credentials file path */
  credentialsFile: string

  /** API base URL for OAuth/usage */
  apiBaseUrl: string

  /** Usage API endpoint path */
  usageEndpoint: string
}

export type ProviderType = 'claude' | 'openclaude'
```

**Status:** ⬜ TODO

### 1.2 Create Claude Provider Implementation

**File:** `packages/core/src/providers/claude.ts`

```typescript
import type { AgentProvider } from './types'

export const claudeProvider: AgentProvider = {
  binaryName: 'claude',
  configHome: '~/.claude',
  projectsDir: '~/.claude/projects',
  skillsDir: '.claude/skills',
  keychainService: 'Claude Code-credentials',
  credentialsFile: '~/.claude/.credentials.json',
  apiBaseUrl: 'https://api.anthropic.com',
  usageEndpoint: '/api/oauth/usage',
}
```

**Status:** ⬜ TODO

### 1.3 Create OpenClaude Provider Implementation

**File:** `packages/core/src/providers/openclaude.ts`

```typescript
import type { AgentProvider } from './types'

export const openclaudeProvider: AgentProvider = {
  binaryName: 'openclaude',
  configHome: '~/.openclaude',
  projectsDir: '~/.openclaude/projects',
  skillsDir: '.openclaude/skills',
  keychainService: 'OpenClaude-credentials', // Verify
  credentialsFile: '~/.openclaude/credentials.json',
  apiBaseUrl: 'https://api.anthropic.com', // Verify
  usageEndpoint: '/api/oauth/usage', // Verify
}
```

**Status:** ⬜ TODO

### 1.4 Create Provider Detection Logic

**File:** `packages/core/src/providers/detectProvider.ts`

```typescript
import { claudeProvider } from './claude'
import { openclaudeProvider } from './openclaude'
import type { AgentProvider, ProviderType } from './types'

export function detectAvailableProvider(): ProviderType | null {
  // Check for openclaude first (our target)
  if (isCommandAvailable(openclaudeProvider.binaryName)) {
    return 'openclaude'
  }
  if (isCommandAvailable(claudeProvider.binaryName)) {
    return 'claude'
  }
  return null
}

export function getProvider(type: ProviderType): AgentProvider {
  switch (type) {
    case 'openclaude':
      return openclaudeProvider
    case 'claude':
      return claudeProvider
  }
}

export function expandPath(path: string): string {
  if (path.startsWith('~/')) {
    return path.replace('~', os.homedir())
  }
  return path
}
```

**Status:** ⬜ TODO

---

## Phase 2: Migrate API Server Files

### 2.1 startupPrerequisites.ts

**File:** `apps/api/src/startupPrerequisites.ts`

**Changes:**
- [ ] Replace hardcoded `"claude"` with provider system
- [ ] Add `ProviderType` parameter to relevant functions
- [ ] Update binary check logic

**Before:**
```typescript
isAvailable('claude')
```

**After:**
```typescript
const provider = detectAvailableProvider()
isAvailable(provider.binaryName)
```

**Status:** ⬜ TODO
**Estimated:** 15 min

### 2.2 claudeSessionScanner.ts → sessionScanner.ts

**File:** `apps/api/src/sessionScanner.ts` (rename)

**Changes:**
- [ ] Import provider system
- [ ] Replace `~/.claude/projects/` with `provider.projectsDir`
- [ ] Update transcript parsing (should be compatible)
- [ ] Rename file and update imports

**Status:** ⬜ TODO
**Estimated:** 30 min

### 2.3 claudeUsage.ts → usageTracker.ts

**File:** `apps/api/src/usageTracker.ts` (rename)

**Changes:**
- [ ] Replace credentials path
- [ ] Replace keychain service name
- [ ] Replace API endpoint
- [ ] Rename file and update imports

**Status:** ⬜ TODO
**Estimated:** 30 min

### 2.4 claudeSkills.ts → skillsManager.ts

**File:** `apps/api/src/skillsManager.ts` (rename)

**Changes:**
- [ ] Replace skills directory path
- [ ] Skills format is compatible
- [ ] Rename file and update imports

**Status:** ⬜ TODO
**Estimated:** 20 min

### 2.5 agentStateDetection.ts

**File:** `apps/api/src/agentStateDetection.ts`

**Changes:**
- [ ] Replace binary name references

**Status:** ⬜ TODO
**Estimated:** 10 min

---

## Phase 3: Update API Routes

### 3.1 codeIntelRoutes.ts

**File:** `apps/api/src/createApiServer/codeIntelRoutes.ts`

**Changes:**
- [ ] Check for hardcoded "claude" references
- [ ] Update any provider-specific logic

**Status:** ⬜ TODO

### 3.2 conversationRoutes.ts

**File:** `apps/api/src/createApiServer/conversationRoutes.ts`

**Changes:**
- [ ] Check for provider-specific logic
- [ ] Ensure compatibility with provider abstraction

**Status:** ⬜ TODO

### 3.3 Other Routes

**Files:** Check all files in `createApiServer/`

**Changes:**
- [ ] Verify no hardcoded provider references
- [ ] Ensure provider-agnostic behavior

**Status:** ⬜ TODO

---

## Phase 4: Web UI Updates

### 4.1 Provider Display Names

**Files:** `apps/web/src/**/*.{ts,tsx}`

**Changes:**
- [ ] "Claude Code" → "Claude Code / OpenClaude" or dynamic
- [ ] Check all UI text mentioning "claude" or "Claude Code"

**Status:** ⬜ TODO

### 4.2 Configuration UI

**Files:** `apps/web/src/components/**/*`

**Changes:**
- [ ] Add provider selection/auto-detection
- [ ] Update settings form labels

**Status:** ⬜ TODO

---

## Phase 5: Documentation

### 5.1 Update AGENTS.md

**File:** `AGENTS.md`

**Changes:**
- [ ] Update agent instructions for OpenClaude
- [ ] Update path references
- [ ] Document provider system

**Status:** ⬜ TODO

### 5.2 Update CLI Reference

**File:** `docs/reference/cli.md`

**Changes:**
- [ ] Add openclaude CLI reference
- [ ] Update path examples

**Status:** ⬜ TODO

### 5.3 Update Troubleshooting

**File:** `docs/reference/troubleshooting.md`

**Changes:**
- [ ] Add OpenClaude troubleshooting section

**Status:** ⬜ TODO

---

## Phase 6: Testing

### 6.1 Unit Tests

**Files:** Update tests for renamed modules

**Changes:**
- [ ] `sessionScanner.test.ts`
- [ ] `usageTracker.test.ts`
- [ ] `skillsManager.test.ts`

**Status:** ⬜ TODO

### 6.2 Integration Tests

**Tests:**
- [ ] Provider detection works
- [ ] Session scanning works with OpenClaude
- [ ] Skills loading works
- [ ] Usage tracking works

**Status:** ⬜ TODO

### 6.3 E2E Tests

**Tests:**
- [ ] Full flow with OpenClaude
- [ ] Verify hooks work correctly

**Status:** ⬜ TODO

---

## Phase 7: Verification

### 7.1 Build Verification

```bash
pnpm build
```

**Expected:** 0 errors

**Status:** ⬜ TODO

### 7.2 Lint Verification

```bash
pnpm lint
```

**Expected:** 0 errors

**Status:** ⬜ TODO

### 7.3 Type Check

```bash
pnpm tsc --noEmit
```

**Expected:** 0 errors

**Status:** ⬜ TODO

### 7.4 Test Suite

```bash
pnpm test
```

**Expected:** All pass

**Status:** ⬜ TODO

---

## Unknown Items (Need Investigation)

- [ ] **OAuth/Usage API**: Verify OpenClaude has comparable API
- [ ] **Keychain Service Name**: Confirm exact service name
- [ ] **Memory Directory**: Verify path for memories
- [ ] **Hook-Chains Support**: Add if beneficial

---

## Rollback Plan

If migration fails:
1. Revert provider implementation
2. Keep original files (don't delete, rename with backup)
3. Restore hardcoded paths temporarily

---

## Success Criteria

- [ ] OpenClaude binary detected correctly
- [ ] Sessions scanned from correct directory
- [ ] Skills loaded from correct directory
- [ ] Hooks fire correctly
- [ ] All existing functionality preserved
- [ ] Zero breaking changes for existing Claude Code users

---

## Timeline Estimate (REVISED)

| Phase | Time | Complexity |
|-------|------|------------|
| Provider Abstraction | 16-24 hours | High |
| API Server Migration | 40+ hours | High |
| Web UI Updates | 4-8 hours | Medium |
| Documentation | 10-15 hours | Medium |
| Testing | 30-40 hours | High |
| **Total** | **~155-170 hours** | - |

> ⚠️ Initial estimate (8-12h) was incorrect. Full rewrite requires 150-200h.

---

## Next Steps

1. [ ] Create `packages/core/src/providers/` directory
2. [ ] Implement provider types and detection
3. [ ] Run first migration test
4. [ ] Iterate based on findings