-- D1 schema: clicks table
-- id: integer primary key autoincrement
-- piece_id: text - which cake piece was clicked
-- created_at: timestamp - when click occurred

CREATE TABLE IF NOT EXISTS clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  piece_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
