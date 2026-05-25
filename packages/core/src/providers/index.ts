import type { TerminalAgentProvider } from "../domain/agentRuntime";

/**
 * Agent provider configuration
 * Abstracts differences between Claude Code and OpenClaude
 */
export interface AgentProviderConfig {
  /** Provider identifier */
  id: TerminalAgentProvider;

  /** Display name for UI */
  displayName: string;

  /** CLI binary name */
  binaryName: string;

  /** Config home directory (~/.claude or ~/.openclaude) */
  configHome: string;

  /** Projects directory for session transcripts */
  projectsDir: string;

  /** Skills directory (relative to config) */
  skillsDir: string;

  /** Settings file name */
  settingsFileName: string;

  /** Turns file extension */
  turnsFileExtension: string;
}

/**
 * All supported agent providers
 */
export const AGENT_PROVIDERS: Record<TerminalAgentProvider, AgentProviderConfig> = {
  "claude-code": {
    id: "claude-code",
    displayName: "Claude Code",
    binaryName: "claude",
    configHome: "~/.claude",
    projectsDir: "~/.claude/projects",
    skillsDir: ".claude/skills",
    settingsFileName: "settings.json",
    turnsFileExtension: ".claude-turns.json",
  },
  openclaude: {
    id: "openclaude",
    displayName: "OpenClaude",
    binaryName: "openclaude",
    configHome: "~/.openclaude",
    projectsDir: "~/.openclaude/projects",
    skillsDir: ".openclaude/skills",
    settingsFileName: "settings.json",
    turnsFileExtension: ".openclaude-turns.json",
  },
  codex: {
    id: "codex",
    displayName: "Codex",
    binaryName: "codex",
    configHome: "~/.codex",
    projectsDir: "~/.codex/projects",
    skillsDir: ".codex/skills",
    settingsFileName: "settings.json",
    turnsFileExtension: ".codex-turns.json",
  },
};

/**
 * Get provider configuration by ID
 */
export function getProviderConfig(provider: TerminalAgentProvider): AgentProviderConfig {
  return AGENT_PROVIDERS[provider];
}

/**
 * Expand ~ in path to home directory
 * Uses Node.js os.homedir() - call site should polyfill for non-Node environments
 */
export function expandPath(path: string, homedir: () => string): string {
  if (path.startsWith("~/")) {
    return path.replace("~", homedir());
  }
  return path;
}

/**
 * Get expanded config home for provider
 */
export function getConfigHome(provider: TerminalAgentProvider, homedir: () => string): string {
  return expandPath(getProviderConfig(provider).configHome, homedir);
}

/**
 * Get expanded projects directory for provider
 */
export function getProjectsDir(provider: TerminalAgentProvider, homedir: () => string): string {
  return expandPath(getProviderConfig(provider).projectsDir, homedir);
}

/**
 * Get skills directory path for provider (relative to project)
 */
export function getSkillsDir(provider: TerminalAgentProvider): string {
  return getProviderConfig(provider).skillsDir;
}

/**
 * Get settings file path for provider (in project directory)
 */
export function getSettingsPath(provider: TerminalAgentProvider, projectDir: string): string {
  const config = getProviderConfig(provider);
  return `${projectDir}/.${config.id}/${config.settingsFileName}`;
}

/**
 * Get turns file path for provider
 */
export function getTurnsFilePath(provider: TerminalAgentProvider, sessionId: string): string {
  const config = getProviderConfig(provider);
  return `${sessionId}${config.turnsFileExtension}`;
}