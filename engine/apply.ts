export function applyMemory(invoice: any, memory: any, audit: any[]) {
  const proposed: string[] = [];

  for (const mem of memory.vendorMem) {
    if (mem.key === "Leistungsdatum" && invoice.fields.serviceDate === null && mem.confidence > 0.65) {
      const match = invoice.rawText.match(/Leistungsdatum:\s*(\d+\.\d+\.\d+)/);
      if (match) {
        invoice.fields.serviceDate = match[1];
        proposed.push("Filled serviceDate from Leistungsdatum");
      }
    }

    if (mem.key === "SKU_MAP" && invoice.fields.lineItems[0].sku === null && mem.confidence > 0.65) {
      invoice.fields.lineItems[0].sku = mem.value;
      proposed.push("Mapped description to FREIGHT SKU");
    }
  }

  audit.push({ step: "apply", timestamp: new Date().toISOString(), details: JSON.stringify(proposed) });
  return proposed;
}
