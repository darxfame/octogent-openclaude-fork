# OpenClaude Migration - Quick Reference

## Files to Modify

### High Priority
- [ ] `apps/api/src/startupPrerequisites.ts` - binary name check
- [ ] `apps/api/src/claudeSessionScanner.ts` → `sessionScanner.ts` - paths
- [ ] `apps/api/src/claudeUsage.ts` → `usageTracker.ts` - credentials/API
- [ ] `apps/api/src/claudeSkills.ts` → `skillsManager.ts` - skills path

### New Files
- [ ] `packages/core/src/providers/types.ts`
- [ ] `packages/core/src/providers/claude.ts`
- [ ] `packages/core/src/providers/openclaude.ts`
- [ ] `packages/core/src/providers/detectProvider.ts`

---

## Path Mappings

| Old (Claude Code) | New (OpenClaude) |
|-------------------|------------------|
| `~/.claude/` | `~/.openclaude/` |
| `~/.claude/projects/` | `~/.openclaude/projects/` |
| `.claude/skills/` | `.openclaude/skills/` |
| `Claude Code-credentials` | TBD |
| `~/.claude/.credentials.json` | `~/.openclaude/credentials.json` |

---

## Verification Checklist

```bash
# 1. Check OpenClaude is available
which openclaude

# 2. Build passes
pnpm build

# 3. Lint passes
pnpm lint

# 4. Types pass
pnpm tsc --noEmit

# 5. Tests pass
pnpm test

# 6. E2E passes
pnpm test:e2e
```

---

## Git Workflow

```bash
# Create branch
git checkout -b feature/openclaude-migration

# Commit provider abstraction
git add packages/core/src/providers/
git commit -m "feat: add provider abstraction layer for Claude/OpenClaude"

# Commit API server changes
git add apps/api/src/
git commit -m "feat: migrate to provider abstraction"

# Test thoroughly
pnpm test && pnpm test:e2e

# Create PR
gh pr create --title "feat: add OpenClaude support" --body "..."
```

---

## Hot Paths (Most Impacted)

1. **Session Scanning** - `claudeSessionScanner.ts`
   - Reads transcript JSONL files
   - Format appears compatible
   - Need to verify path change

2. **Hook Processing** - `hookProcessor.ts`
   - Hook response schema is IDENTICAL
   - May just work with path changes

3. **Usage Tracking** - `claudeUsage.ts`
   - API endpoint needs verification
   - Keychain/credentials path changes

4. **Skills Loading** - `claudeSkills.ts`
   - SKILL.md format is IDENTICAL
   - Just path change needed

---

## Risk Assessment

| Area | Risk | Mitigation |
|------|------|------------|
| API Endpoint | Medium | Verify OpenClaude OAuth API |
| Keychain | Low | Add fallback/error handling |
| Transcript Format | Low | Already verified compatible |
| Hook Format | None | Identical |

---

## Rollback Commands

```bash
# Revert to Claude Code only
git checkout main -- apps/api/src/claudeSessionScanner.ts
git checkout main -- apps/api/src/claudeUsage.ts
git checkout main -- apps/api/src/claudeSkills.ts
git checkout main -- apps/api/src/startupPrerequisites.ts
git checkout main -- packages/core/src/providers/
```