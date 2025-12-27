import Database from "better-sqlite3";

export const db = new Database("memory.db");

db.exec(`
CREATE TABLE IF NOT EXISTS vendor_memory (
  vendor TEXT,
  key TEXT,
  value TEXT,
  confidence REAL
);

CREATE TABLE IF NOT EXISTS correction_memory (
  pattern TEXT,
  action TEXT,
  confidence REAL
);

CREATE TABLE IF NOT EXISTS resolution_memory (
  pattern TEXT,
  approved INTEGER,
  rejected INTEGER
);
`);
