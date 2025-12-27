import { db } from "../db/memoryStore";

type CorrectionRow = {
  confidence: number;
};

export function saveCorrection(pattern: string, action: string) {
  const row = db
    .prepare("SELECT confidence FROM correction_memory WHERE pattern=?")
    .get(pattern) as CorrectionRow | undefined;

  const confidence = row ? Math.min(1, row.confidence + 0.1) : 0.7;

  db.prepare(
    "INSERT OR REPLACE INTO correction_memory (pattern, action, confidence) VALUES (?,?,?)"
  ).run(pattern, action, confidence);
}

export function getCorrections() {
  return db.prepare("SELECT * FROM correction_memory").all();
}
