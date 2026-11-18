-- =====================================================================
-- Migration 002 — save each customer's cart in the database.
-- Run once in Supabase → SQL Editor.
-- Each row means: "this customer has this many of this product in their cart".
-- =====================================================================
create table cart_items (
  user_id     integer     not null references users(user_id) on delete cascade,
  product_id  integer     not null references products(product_id) on delete cascade,
  quantity    integer     not null check (quantity between 1 and 99),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, product_id)   -- one row per product per customer
);

create trigger cart_items_set_updated_at
  before update on cart_items
  for each row execute function set_updated_at();

-- Lock Supabase's public web API; only the FastAPI backend reads/writes carts.
alter table cart_items enable row level security;
