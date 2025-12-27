import { db } from "../db/memoryStore";

type VendorMemoryRow = {
  confidence: number;
};

export function saveVendorMemory(vendor: string, key: string, value: string) {
  const row = db
    .prepare("SELECT confidence FROM vendor_memory WHERE vendor=? AND key=?")
    .get(vendor, key) as VendorMemoryRow | undefined;

  const confidence = row ? Math.min(1, row.confidence + 0.1) : 0.7;

  db.prepare(
    "INSERT OR REPLACE INTO vendor_memory (vendor, key, value, confidence) VALUES (?,?,?,?)"
  ).run(vendor, key, value, confidence);
}

export function getVendorMemory(vendor: string) {
  return db.prepare("SELECT * FROM vendor_memory WHERE vendor=?").all(vendor);
}
