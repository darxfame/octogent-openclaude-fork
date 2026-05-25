# OctoGent OpenClaude Fork

**Status:** Active Development
**Goal:** Migrate from Claude Code to OpenClaude (open-source alternative)

## Overview

This is a fork of [octogent](https://github.com/hesamsheikh/octogent) focused on replacing Claude Code dependency with [OpenClaude](https://github.com/Gitlawb/openclaude) — an open-source CLI agent.

## Why OpenClaude?

- Open-source alternative to Claude Code
- Identical hook API and event system
- Similar skills system
- Uses local AI proxies (no Anthropic OAuth dependency)

## Research Status

### Completed Research

| Finding | Status | Details |
|---------|--------|---------|
| Hook System | ✅ Compatible | Identical event names, response schema |
| Skills Format | ⚠️ Unverified | Directory empty, format assumed compatible |
| Transcript Format | ❌ Incompatible | Different JSONL structure |
| Usage API | ❌ Not Applicable | OpenClaude uses local proxy, no OAuth |
| Auth Model | ✅ Different | Uses `settings.json` with API key, not keychain |

### Key Technical Differences

**Claude Code:**
```json
{"type": "assistant", "message": {"role": "assistant", "content": [...], "usage": {...}}}
```

**OpenClaude:**
```json
{"type": "user", "content": "..."}
{"type": "tool_use", "tool_name": "read", "tool_input": {...}}
{"type": "tool_result", "tool_name": "read", "tool_output": "..."}
{"type": "assistant", "content": "..."}
```

## Migration Scope

### Files Requiring Changes: 18 total

| Category | Count | Impact |
|----------|-------|--------|
| MUST CHANGE | 11 | Complete rewrite/refactor |
| NEEDS VERIFICATION | 3 | May work if compatible |
| CAN KEEP | 4 | UI/presentation only |

### Key Changes Required

1. **Transcript Parser** — Complete rewrite for OpenClaude JSONL format
2. **Usage Tracking** — Redesign (no Anthropic OAuth available)
3. **Provider Abstraction** — New architecture layer
4. **Path Updates** — `~/.claude/` → `~/.openclaude/`

## Time Estimate

| Phase | Hours |
|-------|-------|
| Transcript Parser Rewrite | 16-24h |
| Usage Tracking Redesign | 16-24h |
| Provider Abstraction | 16-24h |
| Session Scanner | 8-12h |
| Hook Processor | 8-12h |
| Testing & Docs | 70-90h |
| **Total** | **~150-200h** |

## Documentation

| File | Contents |
|------|----------|
| [01-research.md](01-research.md) | Initial compatibility research |
| [02-todo-migration.md](02-todo-migration.md) | Detailed migration TODO with phases |
| [03-quick-ref.md](03-quick-ref.md) | Quick reference for developers |
| [04-openclaude-verification.md](04-openclaude-verification.md) | Verification of OpenClaude 0.13.0 |
| [05-full-rewrite-assessment.md](05-full-rewrite-assessment.md) | Component-by-component analysis |
| [06-dependency-inventory.md](06-dependency-inventory.md) | Complete file inventory |

## TODO List

### Pre-flight Checks (Before Starting Implementation)
- [ ] **LIVE HOOK TEST** — Verify hooks fire correctly in OpenClaude
- [ ] **SKILLS TEST** — Create test skill and verify parsing
- [ ] **DECISION:** Support both providers or OpenClaude only?
- [ ] **DECISION:** Usage tracking strategy (skip or build alternative)

### Implementation Phases

#### Phase -1: Core Types
- [ ] Update `TerminalAgentProvider` type
- [ ] Update bootstrap commands
- [ ] Update constants

#### Phase 0: Verification
- [ ] Run live hook test
- [ ] Verify skills format
- [ ] Determine usage tracking strategy

#### Phase 1: Provider Abstraction
- [ ] Create `packages/core/src/providers/types.ts`
- [ ] Create Claude/OpenClaude implementations
- [ ] Create provider detection logic

#### Phase 2: Path-Based Changes
- [ ] Update session scanner paths
- [ ] Update skills manager paths
- [ ] Update hook processor paths

#### Phase 3: Format Changes
- [ ] Rewrite transcript parser
- [ ] Update conversations handler

#### Phase 4: Architecture
- [ ] Redesign usage tracking
- [ ] Update code intel routes
- [ ] Update usage routes

#### Phase 5: Cleanup
- [ ] Rename files
- [ ] Update all imports
- [ ] Update UI labels
- [ ] Update documentation

## Open Questions

1. **Should we support both Claude Code and OpenClaude?**
   - Pro: Backwards compatible
   - Con: More complex, ongoing maintenance

2. **What to do about usage tracking?**
   - Option A: Skip entirely
   - Option B: Build telemetry-based alternative
   - Option C: Query local proxy (if supported)

3. **OpenClaude is beta (0.13.0)**
   - Risk: API may change before 1.0
   - Mitigation: Pin version, use adapter pattern

## Contributing

This is a research/fork project. Contributions welcome but please open an issue first to discuss large changes.

## License

Same as upstream [octogent](https://github.com/hesamsheikh/octogent) — MIT.

## References

- [OctoGent](https://github.com/hesamsheikh/octogent)
- [OpenClaude](https://github.com/Gitlawb/openclaude)
- [OpenClaude Docs](https://docs.openclaude.ai)
- [OpenClaude Hook-Chains](https://docs.openclaude.ai/hook-chains)