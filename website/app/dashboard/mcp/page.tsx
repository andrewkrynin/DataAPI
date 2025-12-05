"use client";

import { useState } from "react";
import { Terminal, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { clsx } from "clsx";

export default function MCPPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const mcpConfig = `{
  "mcpServers": {
    "context-api": {
      "command": "npx",
      "args": ["-y", "@contextapi/mcp-server"],
      "env": {
        "CONTEXT_API_KEY": "your-api-key-here"
      }
    }
  }
}`;

  const exampleUsage = `// Ask Claude to get a YouTube transcript
"Get the transcript for this YouTube video: https://youtube.com/watch?v=dQw4w9WgXcQ"

// Or use natural language
"Summarize the key points from this video transcript"`;

  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      console.error("Failed to copy");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-white">MCP Integration</h1>
          <p className="mt-1 text-sm text-gray-400">
            Use ContextAPI with Claude Desktop via Model Context Protocol
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-3xl">
        {/* What is MCP */}
        <div className="rounded-xl border border-white/10 bg-[#111111] p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5800C3]/10 shrink-0">
              <Terminal className="h-6 w-6 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                What is MCP?
              </h2>
              <p className="mt-2 text-gray-400">
                Model Context Protocol (MCP) allows Claude Desktop to connect to
                external services and tools. With our MCP server, you can ask
                Claude to fetch video transcripts directly in your
                conversations.
              </p>
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
              >
                Learn more about MCP
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5800C3] text-white font-bold text-sm">
                1
              </div>
              <h3 className="text-lg font-semibold text-white">
                Get your API Key
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              First, create an API key from the API Keys page. You&apos;ll need
              this to authenticate requests.
            </p>
            <a
              href="/dashboard/api-keys"
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Go to API Keys
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5800C3] text-white font-bold text-sm">
                2
              </div>
              <h3 className="text-lg font-semibold text-white">
                Configure Claude Desktop
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Add the following configuration to your Claude Desktop settings
              file:
            </p>
            <div className="relative">
              <pre className="rounded-lg bg-black/50 p-4 text-sm text-gray-300 overflow-x-auto">
                <code>{mcpConfig}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(mcpConfig, "config")}
                className={clsx(
                  "absolute right-3 top-3 rounded-lg p-2 transition-colors",
                  copiedCode === "config"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {copiedCode === "config" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Config file location:
              <br />
              macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
              <br />
              Windows: %APPDATA%\Claude\claude_desktop_config.json
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-white/10 bg-[#111111] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5800C3] text-white font-bold text-sm">
                3
              </div>
              <h3 className="text-lg font-semibold text-white">
                Start Using It
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Restart Claude Desktop, then you can ask Claude to fetch
              transcripts:
            </p>
            <div className="relative">
              <pre className="rounded-lg bg-black/50 p-4 text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                <code>{exampleUsage}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(exampleUsage, "usage")}
                className={clsx(
                  "absolute right-3 top-3 rounded-lg p-2 transition-colors",
                  copiedCode === "usage"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {copiedCode === "usage" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-sm text-gray-400">
            Check out our{" "}
            <a
              href="/dashboard/docs"
              className="text-[#8B5CF6] hover:text-[#A78BFA]"
            >
              documentation
            </a>{" "}
            or{" "}
            <a
              href="/dashboard/contact"
              className="text-[#8B5CF6] hover:text-[#A78BFA]"
            >
              contact support
            </a>{" "}
            if you run into any issues.
          </p>
        </div>
      </div>
    </div>
  );
}
