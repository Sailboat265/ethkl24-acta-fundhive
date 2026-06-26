# FundHive - Decentralized Fundraising Platform

**FundHive** is a Web3-powered fundraising platform built on Ethereum Layer 2 networks (Scroll). It enables transparent, decentralized project funding through verified user registries and smart contracts, with a modern full-stack dApp combining Solidity contracts, Hardhat, and Next.js.

---

## What This Is

FundHive is a complete decentralized fundraising application that allows verified users to create funding campaigns and supporters to contribute directly to projects via blockchain transactions. The platform leverages smart contracts for transparency and uses a modern Web3 stack for a seamless user experience. Projects are tracked on-chain with immutable records, and user verification ensures accountability.

### Stack
- **Languages:** TypeScript (93.9%), Solidity (3.9%), JavaScript (1.2%)
- **Frameworks:** Next.js 14 (frontend), Hardhat 2.22 (smart contract dev)
- **Key Libraries:** 
  - RainbowKit + Wagmi 2 (Web3 wallet integration)
  - Viem (Ethereum interactions)
  - TanStack React Query (data fetching)
  - Uniswap SDK (DeFi utilities)
  - Mongoose + MongoDB (backend persistence)
  - OpenZeppelin Contracts (smart contract standards)
  - Tailwind CSS + DaisyUI (UI styling)

---

## How It's Organized

```
packages/
  ├── hardhat/              Smart contract layer
  │   ├── contracts/        Solidity contracts
  │   │   ├── UserRegistry.sol    User verification & registration
  │   │   ├── Project.sol         Campaign & funding logic
  │   │   └── YourContract.sol    Additional utilities
  │   ├── deploy/           Hardhat deploy scripts
  │   ├── scripts/          Blockchain interaction helpers
  │   ├── test/             Smart contract tests
  │   └── hardhat.config.ts Configuration (Scroll, Sepolia, etc.)
  │
  └── nextjs/               Frontend & API layer
      ├── app/              Next.js App Router pages
      ├── components/       React components
      ├── hooks/            Custom React hooks
      ├── services/         Business logic & API calls
      ├── models/           Mongoose database schemas
      ├── lib/              Utilities & helpers
      ├── utils/            Formatting & conversion functions
      ├── styles/           Global & component styles
      ├── types/            TypeScript type definitions
      └── public/           Static assets

.github/                     GitHub Actions workflows
.husky/                      Git hooks (pre-commit linting)
```

**How It Fits Together:**

Users interact with the Next.js frontend, which connects to their Web3 wallets (via RainbowKit/Wagmi). When users perform actions (create projects, pledge funds), the frontend calls Hardhat-deployed smart contracts on Scroll testnet. Project and user data is stored both on-chain (immutable records) and in a MongoDB backend (for indexing and fast queries). Verified user information flows through the UserRegistry contract, while funding campaigns are managed by the Project contract. The backend services orchestrate between the frontend and blockchain layer, handling transaction receipts and data aggregation.

---

## How to Run It

### Prerequisites
- **Node.js** ≥ 18.18.0
- **Yarn** 3.2.3 (or npm)
- **Git**

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/Sailboat265/ethkl24-acta-fundhive.git
   cd ethkl24-acta-fundhive
   yarn install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` files to `.env.local` in both `packages/hardhat` and `packages/nextjs`
   - Add your RPC provider API keys (Alchemy), private key for deployment, and MongoDB URI:
     ```bash
     # packages/hardhat/.env.local
     DEPLOYER_PRIVATE_KEY=your_private_key
     ALCHEMY_API_KEY=your_alchemy_key
     ETHERSCAN_API_KEY=your_etherscan_key

     # packages/nextjs/.env.local
     NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_id
     MONGODB_URI=your_mongodb_uri
     ```

### Run Locally

**Start the frontend (Next.js dev server):**
```bash
yarn start
```
Opens at `http://localhost:3000`

**Compile smart contracts:**
```bash
yarn compile
```

**Deploy contracts to Scroll Sepolia:**
```bash
yarn deploy
```

**Run contract tests:**
```bash
yarn test
```

**Verify contract on block explorer:**
```bash
yarn verify
```

**Start local Hardhat node (for local testing):**
```bash
yarn chain
```

### Production Build

**Build Next.js for deployment:**
```bash
yarn next:build
yarn next:serve
```

**Deploy to Vercel (if configured):**
```bash
yarn vercel
```

---

## Try Asking

- **How do I create a new campaign?** Check `packages/nextjs/services/` for campaign creation logic and `packages/hardhat/contracts/Project.sol` for on-chain campaign storage.
- **How are users verified on-chain?** Look at `packages/hardhat/contracts/UserRegistry.sol` for the verification contract and the associated frontend component in `packages/nextjs/components/`.
- **How do I add a new blockchain network?** Edit `packages/hardhat/hardhat.config.ts` to add network configuration and update `packages/nextjs/scaffold.config.ts` for frontend awareness.

---

## License

This project is licensed under the MIT License — see the [LICENCE](LICENCE) file for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

---

## Deployed Contracts

**Scroll Sepolia Testnet:**
- **UserRegistry:** [0xCc4928AD848A0A0d00de5fccf24bA8f6c17AFE79](https://sepolia.scrollscan.com/address/0xCc4928AD848A0A0d00de5fccf24bA8f6c17AFE79#code)
- **Project:** [0x7763eCBBf26156BA045Ec0b2e9aAEF9735058394](https://sepolia.scrollscan.com/address/0x7763eCBBf26156BA045Ec0b2e9aAEF9735058394#code)

---

Built with ❤️ using [Scaffold-ETH-2](https://github.com/scaffold-eth/scaffold-eth-2)
