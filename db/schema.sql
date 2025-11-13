DROP TABLE IF EXISTS access_logs; -- Xóa bảng cũ nếu muốn làm sạch
CREATE TABLE IF NOT EXISTS access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  model TEXT,
  ua TEXT, -- User Agent (Trình duyệt/Thiết bị)
  country TEXT,
  city TEXT,
  time TEXT
);

DROP TABLE IF EXISTS clicks; 
CREATE TABLE IF NOT EXISTS clicks (
  piece_id TEXT PRIMARY KEY,
  click_count INTEGER DEFAULT 0,
  user_ip TEXT,
  last_clicked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);