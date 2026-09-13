-- ============================================================
-- カフェ/レストラン予約管理システム: テーブル定義 & RLS ポリシー
-- Supabase の SQL Editor でそのまま実行してください
-- ============================================================

-- 予約テーブル
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_date date not null,
  reservation_time time not null,
  party_size integer not null check (party_size > 0),
  name text not null,
  phone text not null,
  email text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'cancelled')),
  created_at timestamptz not null default now()
);

comment on table public.reservations is '店舗への来店予約';
comment on column public.reservations.status is 'pending=受付, approved=承認, cancelled=キャンセル/却下';

-- 日付順の一覧表示を高速化
create index if not exists reservations_date_time_idx
  on public.reservations (reservation_date, reservation_time);

-- Row Level Security を有効化
alter table public.reservations enable row level security;

-- 誰でも(未ログインの顧客)予約を新規作成できる
drop policy if exists "Anyone can create a reservation" on public.reservations;
create policy "Anyone can create a reservation"
  on public.reservations
  for insert
  to anon, authenticated
  with check (true);

-- ログイン済み(管理者)のみ一覧参照できる
drop policy if exists "Authenticated users can view reservations" on public.reservations;
create policy "Authenticated users can view reservations"
  on public.reservations
  for select
  to authenticated
  using (true);

-- ログイン済み(管理者)のみ承認/却下などの更新ができる
drop policy if exists "Authenticated users can update reservations" on public.reservations;
create policy "Authenticated users can update reservations"
  on public.reservations
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- 管理者アカウントの作成方法:
-- Supabase Dashboard > Authentication > Users > Add user
-- から管理者用のメールアドレス・パスワードを作成してください。
-- (このアプリでは管理画面からの新規登録は行わない想定です)
-- ============================================================
