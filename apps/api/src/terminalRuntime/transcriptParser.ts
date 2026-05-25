import { existsSync, readFileSync } from "node:fs";

import { logVerbose } from "../logging";
import type { TerminalAgentProvider } from "@octogent/core";

import {
  parseClaudeTranscript as parseClaudeCodeTranscript,
  type ConversationTurn,
} from "./conversations/claudeCodeTranscript";
import { parseOpenClaudeTranscript } from "./conversations/openclaudeTranscript";

/**
 * Parse transcript based on provider type.
 * Falls back to Claude Code format for unknown providers.
 */
export const parseClaudeTranscript = (
  transcriptPath: string,
  provider: TerminalAgentProvider = "claude-code",
): ConversationTurn[] | null => {
  if (!existsSync(transcriptPath)) {
    logVerbose(`[Transcript] File not found: ${transcriptPath}`);
    return null;
  }

  try {
    const content = readFileSync(transcriptPath, "utf8");
    if (!content.trim()) {
      logVerbose(`[Transcript] Empty file: ${transcriptPath}`);
      return null;
    }

    // Use provider-specific parser
    if (provider === "openclaude") {
      return parseOpenClaudeTranscript(content);
    }

    // Claude Code format - parse from file path
    return parseClaudeCodeTranscript(transcriptPath);
  } catch (err) {
    logVerbose(`[Transcript] Error reading ${transcriptPath}: ${err}`);
    return null;
  }
};