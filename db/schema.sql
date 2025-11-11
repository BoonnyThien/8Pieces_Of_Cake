-- db/schema.sql
CREATE TABLE IF NOT EXISTS clicks (
  piece_id TEXT PRIMARY KEY,
  click_count INTEGER DEFAULT 0,
  user_ip TEXT,
  last_clicked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng riêng để log chi tiết từng click nếu cần
CREATE TABLE IF NOT EXISTS click_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  piece_id TEXT,
  user_ip TEXT,
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT
);