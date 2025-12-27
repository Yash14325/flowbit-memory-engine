import { saveVendorMemory } from "../memory/vendorMemory";


export function learn(invoice: any, human: any, audit: any[]) {
  if (!human) return [];

  const updates: string[] = [];
  for (const corr of human.corrections) {
    if (corr.reason.includes("Leistungsdatum")) {
      saveVendorMemory(invoice.vendor, "Leistungsdatum", "serviceDate");
      updates.push("Learned Leistungsdatum mapping");
    }
    if (corr.reason.includes("Seefracht")) {
      saveVendorMemory(invoice.vendor, "SKU_MAP", "FREIGHT");
      updates.push("Learned FREIGHT SKU mapping");
    }
  }

  audit.push({ step: "learn", timestamp: new Date().toISOString(), details: JSON.stringify(updates) });
  return updates;
}
