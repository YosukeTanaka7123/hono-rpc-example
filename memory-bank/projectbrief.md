# Project Brief: Hono RPC Example

このプロジェクトは、Hono と React を使用した RPC（Remote Procedure Call）の実装例です。TypeScript とモダンな Web ツールを活用して、タイプセーフなクライアント-サーバー間通信を実現しています。

## 主要な目的

1. Hono の RPC 機能の実践的な使用例を提供
2. TypeScript による完全な型安全性の実現
3. モダンな Web 開発ツールの統合例の提示

## 技術スタック

### インフラストラクチャ

- Turborepo（モノレポ管理）
- pnpm（パッケージマネージャー）
- Cloudflare Workers（サーバーレス実行環境）

### バックエンド

- Hono（Web フレームワーク）
- Zod（バリデーション）

### フロントエンド

- React
- TanStack Query（データフェッチング）
- React Hook Form（フォーム管理）
- Hono Client（タイプセーフな API 通信）

## プロジェクト構成

```
hono-rpc-example/
├── apps/
│   ├── client/         # Reactフロントエンド
│   └── server/         # Honoバックエンド
└── packages/
    └── tsconfig/       # 共有TypeScript設定
```
