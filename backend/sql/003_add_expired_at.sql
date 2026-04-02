-- Add expiry column for existing databases (MySQL).
-- Match schema name in backend/sql/schema.sql (`demo_iot`).

USE `demo_iot`;

ALTER TABLE `user`
  ADD COLUMN `expired_at` DATE NULL AFTER `creat_at`;

-- Backfill rows that still have NULL (e.g. after ADD COLUMN on legacy DB)
UPDATE `user` SET `expired_at` = DATE_ADD(`creat_at`, INTERVAL 365 DAY) WHERE `expired_at` IS NULL;
