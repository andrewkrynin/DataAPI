"use client";

import { useState } from "react";
import {
  FileText,
  ChevronRight,
  Copy,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { clsx } from "clsx";

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      console.error("Failed to copy");
    }
  }

  const CodeBlock = ({
    code,
    id,
    language = "bash",
  }: {
    code: string;
    id: string;
    language?: string;
  }) => (
    <div className="relative my-4">
      <pre className="rounded-lg bg-black/50 p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className={clsx(
          "absolute right-3 top-3 rounded-lg p-2 transition-colors",
          copiedCode === id
            ? "bg-green-500/10 text-green-400"
            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
        )}
      >
        {copiedCode === id ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );

  const sections: DocSection[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Welcome to the ContextAPI documentation. This guide will help you
            get started with our API.
          </p>
          <h3 className="text-lg font-semibold text-white mt-6">
            1. Get your API Key
          </h3>
          <p>
            First, you need to create an API key from the{" "}
            <a
              href="/dashboard/api-keys"
              className="text-[#8B5CF6] hover:underline"
            >
              API Keys page
            </a>
            .
          </p>
          <h3 className="text-lg font-semibold text-white mt-6">
            2. Make your first request
          </h3>
          <CodeBlock
            id="first-request"
            code={`curl -X GET "https://api.contextapi.com/v1/transcript?video_id=dQw4w9WgXcQ" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
          />
        </div>
      ),
    },
    {
      id: "authentication",
      title: "Authentication",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            All API requests require authentication using a Bearer token in the
            Authorization header.
          </p>
          <CodeBlock
            id="auth-header"
            code={`Authorization: Bearer YOUR_API_KEY`}
          />
          <h3 className="text-lg font-semibold text-white mt-6">
            API Endpoints
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                  POST
                </span>
                <code className="text-sm">/auth/request-key</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Request a new API key
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/auth/api-keys</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                List all API keys for current developer
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                  DELETE
                </span>
                <code className="text-sm">/auth/api-keys/{"{id}"}</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">Revoke an API key</p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/auth/me</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Get current developer profile
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "credits",
      title: "Credits",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            Credits are used to pay for API requests. Each successful request
            consumes credits based on the operation type.
          </p>
          <h3 className="text-lg font-semibold text-white mt-6">
            Credit Endpoints
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/credits</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Get current credit balance
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/credits/transactions</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Get credit transaction history
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mt-6">
            Example Response
          </h3>
          <CodeBlock
            id="credits-response"
            language="json"
            code={`{
  "balance": 100,
  "totalUsed": 50,
  "totalPurchased": 150
}`}
          />
        </div>
      ),
    },
    {
      id: "demand",
      title: "Demand API",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>
            The Demand API allows you to see which creators are most requested
            by the community.
          </p>
          <h3 className="text-lg font-semibold text-white mt-6">Endpoints</h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/v1/demand</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Get demand leaderboard
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                  GET
                </span>
                <code className="text-sm">/v1/demand/{"{username}"}</code>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Get detailed demand for a specific username
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "health",
      title: "Health Check",
      content: (
        <div className="space-y-4 text-gray-300">
          <p>Use the health endpoint to check the API status.</p>
          <div className="rounded-lg bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                GET
              </span>
              <code className="text-sm">/health</code>
            </div>
            <p className="mt-2 text-sm text-gray-400">Health check endpoint</p>
          </div>
          <h3 className="text-lg font-semibold text-white mt-6">
            Example Response
          </h3>
          <CodeBlock
            id="health-response"
            language="json"
            code={`{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "services": {
    "database": "up",
    "cache": "up",
    "queue": "up"
  }
}`}
          />
        </div>
      ),
    },
  ];

  const activeContent = sections.find((s) => s.id === activeSection);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Documentation</h1>
            <p className="mt-1 text-sm text-gray-400">
              API reference and guides
            </p>
          </div>
          <a
            href="https://dev.doppelgangers.ai:3003/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Full API Docs
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 border-r border-white/10 p-6">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={clsx(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {section.title}
                </span>
                {activeSection === section.id && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {activeContent?.title}
            </h2>
            {activeContent?.content}
          </div>
        </main>
      </div>
    </div>
  );
}
