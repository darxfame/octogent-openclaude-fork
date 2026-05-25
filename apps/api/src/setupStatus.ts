import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import type { WorkspaceSetupSnapshot, WorkspaceSetupStep } from "@octogent/core";

import { readDeckTentacles } from "./deck/readDeckTentacles";
import {
  deriveProjectIdFromWorkspace,
  ensureOctogentGitignoreEntry,
  ensureProjectScaffold,
  hasOctogentGitignoreEntry,
  loadProjectConfig,
  migrateStateToGlobal,
  registerProject,
} from "./projectPersistence";
import { readSetupState } from "./setupState";
import { collectStartupPrerequisiteReport } from "./startupPrerequisites";

export const initializeWorkspaceFiles = (workspaceCwd: string, projectStateDir: string) => {
  const projectName = loadProjectConfig(workspaceCwd)?.displayName;
  const projectConfig = ensureProjectScaffold(
    workspaceCwd,
    projectName,
    deriveProjectIdFromWorkspace(workspaceCwd),
  );
  registerProject(workspaceCwd, projectConfig.displayName);
  mkdirSync(join(projectStateDir, "state"), { recursive: true });
  migrateStateToGlobal(workspaceCwd, projectStateDir);

  return { projectConfig, projectStateDir };
};

export const ensureWorkspaceGitignore = (workspaceCwd: string) =>
  ensureOctogentGitignoreEntry(workspaceCwd);

export const readWorkspaceSetupSnapshot = (
  workspaceCwd: string,
  projectStateDir: string,
): WorkspaceSetupSnapshot => {
  const prerequisites = collectStartupPrerequisiteReport();
  const projectConfig = loadProjectConfig(workspaceCwd);
  const octogentDir = join(workspaceCwd, ".octogent");
  const hasProjectScaffold =
    projectConfig !== null &&
    existsSync(join(octogentDir, "tentacles")) &&
    existsSync(join(octogentDir, "worktrees")) &&
    existsSync(join(projectStateDir, "state"));
  const hasGitignore = hasOctogentGitignoreEntry(workspaceCwd);
  const tentacles = readDeckTentacles(workspaceCwd, projectStateDir);
  const tentacleCount = tentacles.length;
  const hasAnyTentacles = tentacleCount > 0;
  const setupState = readSetupState(projectStateDir);
  const isFirstRun = !hasAnyTentacles && !setupState.tentaclesInitializedAt;
  const verifiedSteps = setupState.verifiedSteps ?? {};
  const isClaudeVerified = Boolean(verifiedSteps["check-claude"]);
  const isGitVerified = Boolean(verifiedSteps["check-git"]);
  const isCurlVerified = Boolean(verifiedSteps["check-curl"]);
  const hasAgentCLI = prerequisites.availability.claude || prerequisites.availability.openclaude;
  const hasGit = prerequisites.availability.git;
  const hasCurl = prerequisites.availability.curl;

  const steps: WorkspaceSetupStep[] = [
    {
      id: "initialize-workspace",
      title: "Initialize workspace",
      description: "Create Octogent project files and runtime directories.",
      complete: hasProjectScaffold,
      required: true,
      actionLabel: "Initialize workspace",
      statusText: hasProjectScaffold
        ? "Workspace files are ready."
        : "Create .octogent project files before continuing.",
      guidance: hasProjectScaffold
        ? null
        : "Workspace initialization failed. Run the Octogent initializer in this repository.",
      command: hasProjectScaffold ? null : "octogent init",
    },
    {
      id: "ensure-gitignore",
      title: "Ignore .octogent",
      description: "Add .octogent to .gitignore, or create .gitignore when it is missing.",
      complete: hasGitignore,
      required: true,
      actionLabel: "Update .gitignore",
      statusText: hasGitignore
        ? ".gitignore covers .octogent."
        : "Add .octogent to .gitignore before creating tentacles.",
      guidance: hasGitignore
        ? null
        : "Git ignore entry is missing. Create or update .gitignore with the Octogent workspace path.",
      command: hasGitignore ? null : "printf '.octogent\\n' >> .gitignore",
    },
    {
      id: "check-claude",
      title: "Check Agent CLI",
      description: "Verify Claude Code or OpenClaude is available on this machine.",
      complete: hasAgentCLI && isClaudeVerified,
      required: false,
      actionLabel: "Check Agent CLI",
      statusText: hasAgentCLI
        ? isClaudeVerified
          ? "Agent CLI is available."
          : "Confirm agent CLI before using the planner."
        : "No agent CLI available.",
      guidance: hasAgentCLI
        ? isClaudeVerified
          ? null
          : "Click to verify the agent CLI on this machine."
        : "Install Claude Code, OpenClaude, or Codex before using agent terminals.",
      command: hasAgentCLI ? null : "claude login # or: openclaude",
    },
    {
      id: "check-git",
      title: "Check Git",
      description: "Verify Git is available for worktree-backed tentacles.",
      complete: hasGit && isGitVerified,
      required: false,
      actionLabel: "Check Git",
      statusText: hasGit
        ? isGitVerified
          ? "Git is available."
          : "Confirm Git before launching worktree-backed tentacles."
        : "Git is unavailable.",
      guidance: hasGit
        ? isGitVerified
          ? null
          : "Click to verify Git support for worktree terminal flows."
        : "Install Git to enable worktree terminals and branch flows.",
      command: hasGit ? null : "git --version",
    },
    {
      id: "check-curl",
      title: "Check curl",
      description: "Verify curl is available for agent hook callbacks.",
      complete: hasCurl && isCurlVerified,
      required: false,
      actionLabel: "Check curl",
      statusText: hasCurl
        ? isCurlVerified
          ? "curl is available."
          : "Confirm curl before using hook callbacks."
        : "curl is unavailable.",
      guidance: hasCurl
        ? isCurlVerified
          ? null
          : "Click to verify hook callback support on this machine."
        : "Install curl to restore agent hook callbacks.",
      command: hasCurl ? null : "curl --version",
    },
    {
      id: "create-tentacles",
      title: "Create tentacles",
      description: "Create at least one tentacle before launching a coding agent.",
      complete: hasAnyTentacles,
      required: true,
      actionLabel: null,
      statusText: hasAnyTentacles
        ? `${tentacleCount} tentacle${tentacleCount === 1 ? "" : "s"} ready.`
        : "Create your first tentacle to continue.",
      guidance: hasAnyTentacles
        ? null
        : "Use the planner or manual creation to add at least one tentacle.",
      command: null,
    },
  ];

  return {
    isFirstRun,
    shouldShowSetupCard: isFirstRun || (!hasAnyTentacles && (!hasProjectScaffold || !hasGitignore)),
    hasAnyTentacles,
    tentacleCount,
    steps,
  };
};
