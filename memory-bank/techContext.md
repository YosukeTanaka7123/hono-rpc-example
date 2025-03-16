# Technical Context: Hono RPC Example

## 開発環境

### 必要要件

- Node.js >= 18
- pnpm >= 10.6.3
- Cloudflare ワーカーアカウント

### パッケージマネージャー

- pnpm workspaces によるモノレポ管理
- Turborepo によるタスク実行の最適化

## 技術スタック詳細

### コア技術

1. TypeScript

   - 厳格なタイプチェック
   - プロジェクト全体での型共有
   - `tsconfig.json` の共通設定

2. Hono

   - 軽量な Web フレームワーク
   - Cloudflare Workers 対応
   - タイプセーフな API 定義

3. React + Vite
   - 最新の React 開発環境
   - 高速な開発サーバー
   - 最適化されたビルド

### データ管理

1. TanStack Query

   - サーバーステート管理
   - キャッシュ最適化
   - 自動再検証

2. React Hook Form
   - パフォーマンス最適化
   - バリデーション統合
   - タイプセーフなフォーム

### バリデーション

- Zod スキーマ
  - ランタイムチェック
  - TypeScript との統合
  - クライアント/サーバー共有

## 開発ツール

### コード品質

1. biome

   - リンティング
   - コードフォーマット
   - 一貫性の維持

2. vitest
   - ユニットテスト
   - カバレッジレポート
   - テスト UI

### ビルドツール

1. Turborepo

   - ビルドキャッシュ
   - 依存関係の最適化
   - 並列タスク実行

2. Vite
   - 高速な開発環境
   - 最適化されたビルド
   - HMR サポート

## API エンドポイント

### Posts API

1. 取得系

```typescript
GET /posts      // 全件取得
GET /posts/:id  // 個別取得
```

2. 更新系

```typescript
POST /posts     // 新規作成
PUT /posts/:id  // 更新
DELETE /posts   // 削除
```

## 型定義

### リクエスト/レスポンス

```typescript
// 共有型定義
interface Post {
  id: string;
  fullname: string;
  age: number;
}

// バリデーションスキーマ
const postSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  age: z.number(),
});
```
