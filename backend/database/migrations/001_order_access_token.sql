-- =====================================================================
-- Migration 001 — secret link for each order.
-- Run once in Supabase → SQL Editor (you already ran schema.sql before this).
--
-- Order numbers (LC-2026-0001, -0002, ...) are easy to guess, so the
-- confirmation page also needs this random token. Without it, anyone could
-- type another order number and see that customer's name and address.
-- =====================================================================
alter table orders
  add column access_token uuid not null default gen_random_uuid() unique;
