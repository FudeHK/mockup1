# Cafe Lumière 予約サイト

架空のカフェ「Cafe Lumière」向けの LP + 予約管理システムです。

- フロントエンド: Next.js 15 (App Router) / React 19 / JavaScript
- データベース・認証: Supabase (Postgres + Supabase Auth)
- デプロイ想定: Vercel

## 構成

```
app/
  page.js                 トップページ (LP)
  components/             LP の各セクション（Hero, Concept, Menu, Access, ReservationForm など）
  reservation/actions.js  予約フォームの Server Action（reservations テーブルへ INSERT）
  admin/login/            管理者ログインページ（Supabase Auth）
  admin/(dashboard)/      予約一覧・承認/却下（ログイン必須）
lib/supabase/             Supabase クライアント（ブラウザ / サーバー / ミドルウェア）
middleware.js             /admin 配下の認証ガード
supabase/schema.sql       テーブル定義・RLS ポリシー
```

## セットアップ手順

### 1. Supabase プロジェクトを作成

1. https://supabase.com でプロジェクトを新規作成
2. 「SQL Editor」を開き、[`supabase/schema.sql`](./supabase/schema.sql) の内容を実行してテーブルと RLS ポリシーを作成
3. 「Authentication > Users」から管理者用アカウント（メール＋パスワード）を作成
   - このアプリには管理者の新規登録画面はありません（意図的にサインアップ不可）
4. 「Project Settings > API」から以下を控える
   - Project URL
   - anon public key

### 2. 環境変数を設定

`.env.local` の値を、Supabase の値に置き換えてください（現在はプレースホルダーです）。

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. ローカル起動

```bash
npm install
npm run dev
```

http://localhost:3000 で LP、 http://localhost:3000/admin で管理画面（未ログイン時は自動的にログイン画面へリダイレクト）が確認できます。

## 予約の承認フロー

1. 顧客が LP の予約フォームから送信 → `reservations` テーブルに `status: pending` で INSERT
2. 管理者がログインし、`/admin` の一覧から「承認」「却下」を選択
   - 承認 → `status: approved`
   - 却下 → `status: cancelled`

## デプロイ (Vercel)

1. GitHub にリポジトリを push
2. Vercel で「Import Project」からリポジトリを選択
3. Environment Variables に `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定
4. デプロイ

## セキュリティに関する注意

- `reservations` テーブルは RLS を有効化しており、予約の新規作成（INSERT）のみ匿名ユーザーに許可し、閲覧・更新（承認/却下）はログイン済みユーザー（Supabase Auth 認証済み）のみ許可しています。
- Next.js は npm 監査で指摘された脆弱性を回避するため 15.5.25（パッチ適用版）を使用しています。
