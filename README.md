# GetContext: The Data Liquidity Layer for AI Agents

![Network](https://img.shields.io/badge/Network-BNB_Smart_Chain-F0B90B?style=flat&logo=binance)
![Storage](https://img.shields.io/badge/Storage-BNB_Greenfield-28A745?style=flat&logo=binance)
![Protocol](https://img.shields.io/badge/Protocol-MCP-blue)
![Status](https://img.shields.io/badge/Status-Hackathon_Submission-red)

> **🏆 BNB Chain Hackathon Submission**
> **Mission:** A decentralized service where Agents access *any* social stream without API limits, and Users monetize their digital footprint via BNB Chain.

---

## 🚀 The Vision: A Self-Sustaining Data Flywheel

We built **GetContext** to solve the two biggest bottlenecks in the AI economy with a single, powerful service:

1.  **For AI Agents:** Access to Twitter, TikTok, Instagram, and YouTube data **without** needing official APIs, hitting daily/monthly limits, or maintaining fragile scraping pipelines.
2.  **For Users:** The ability to **tokenize** social data into an asset that earns yield every time an agent uses it.

It creates a perfect economy: **Users provide the fuel (Data), Agents provide the demand (Fees), and BNB Chain settles the value.**

---

## ⚡ Side A: The Service (For Developers & Agents)

Stop building RAG pipelines from scratch. Stop worrying about "429 Too Many Requests."

**GetContext** provides a unified, high-speed pipe for social context.
* **Universal Access:** Query `@elonmusk` on X, a YouTube channel, or a TikTok feed via one standard interface.
* **No Rate Limits:** Our decentralized architecture bypasses platform bottlenecks.
* **Agent-Ready:** Data arrives pre-vectorized and structured (XML/JSON), ready for LLM consumption.
* **Pay-As-You-Go:** No monthly subscriptions. Your agent pays micropayments (HTTP 402) only for the data it consumes.

> **Developer Experience:**
> Connect your agent to the global stream in 3 lines of config.
> ```json
> "mcpServers": {
>   "getcontext": { "url": "[https://mcp.context.supply/sse](https://mcp.context.supply/sse)" }
> }
> ```

---

## 💎 Side B: The Economy (For Users & Data Owners)

Turn any digital footprint into a valuable data asset.

* **Mint Your Stream:** Select url. and mint a **Datastream NFT** on BNB Chain.
* **Verified Ownership:** The NFT proves you own this data source. The raw data is stored securely on **BNB Greenfield**.
* **Real-Time Yield:** Every time an AI Agent queries your stream (e.g., to analyze your posting style), you earn a fee in real-time.
* **The Flywheel:** High-quality user data attracts more agents → More agent fees attract more users.

---

## 🏗 How It Works (The Architecture)

    User[User Minting] -->|Creates| NFT[Datastream NFT (BNB Chain)]
    NFT -->|Feeds| VectorDB[Greenfield Vector Store]
    
    Agent[AI Agent] -->|Queries| MCP[GetContext MCP Server]
    MCP -->|Reads| VectorDB
    
    Agent -.->|Pays Fees (402)| NFT
    NFT -.->|Yield| User

🛠 Usage Guide
1. Consumer: Connect an Agent
Add our MCP server to your Claude Desktop, Windsurf, or Cursor config:
{
  "mcpServers": {
    "getcontext": {
      "command": "npx",
      "args": ["-y", "context-api-mcp"],
      "env": { "CONTEXT_API_KEY": "your-key" }
    }
  }
}

2. Provider: Mint a Stream
Go to the GetContext Dashboard.

Turn any media account X/Twitter, LinkedIn, or TikTok, Youtube into live Datastream.

Click "Mint Datastream" to deploy your NFT on BNB Chain.

Watch your wallet as agents begin to query it.

⛓️ Deployed Contracts BNB Testnet https://testnet.bscscan.com/address/0x398c8da6159884bc2b2ccc04e782a51c7a842c65
Contract,Address,Description
DatastreamNFT,0x...,ERC-721 Token representing the data source
PaymentRouter,0x...,Handles HTTP 402 splits and royalties
GreenfieldBucket,gnfd://...,Vector storage location

🔮 Roadmap
[x] Phase 1 (Hackathon): Core MCP Server & BNB Datastream Minting.

[ ] Phase 2: Support for YouTube & TikTok Video support.

[ ] Phase 3: "Data Staking" – Users stake BNB on high-quality streams to boost their visibility to agents.

[ ] Phase 4: Mainnet Launch.
