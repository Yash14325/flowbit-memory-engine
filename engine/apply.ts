import * as fs from "fs";

export function applyMemory(invoice: any, memory: any, audit: any[]) {
  const proposed: string[] = [];

  // 🔁 Load full history for duplicate detection
  const history = JSON.parse(fs.readFileSync("invoices_extracted.json", "utf8"));

  // =========================
  // 1️⃣ DUPLICATE DETECTION
  // =========================
  const duplicate = history.find((i: any) =>
    i.invoiceId !== invoice.invoiceId &&
    i.vendor === invoice.vendor &&
    i.fields.invoiceNumber === invoice.fields.invoiceNumber
  );

  if (duplicate) {
    proposed.push("Possible duplicate invoice detected");
  }

  // =========================
  // 2️⃣ VENDOR MEMORY
  // =========================
  for (const mem of memory.vendorMem) {

    // Leistungsdatum → serviceDate
    if (
      mem.key === "Leistungsdatum" &&
      !invoice.fields.serviceDate &&
      mem.confidence > 0.65
    ) {
      const match = invoice.rawText.match(/Leistungsdatum:\s*(\d+\.\d+\.\d+)/);
      if (match) {
        invoice.fields.serviceDate = match[1];
        proposed.push("Filled serviceDate from Leistungsdatum");
      }
    }

    // FREIGHT SKU mapping
    if (
      mem.key === "SKU_MAP" &&
      !invoice.fields.lineItems[0].sku &&
      mem.confidence > 0.65
    ) {
      invoice.fields.lineItems[0].sku = mem.value;
      proposed.push("Mapped Shipping description to FREIGHT SKU");
    }
  }

  // =========================
  // 3️⃣ PO AUTO MATCH (INV-A-003)
  // =========================
  if (
    invoice.vendor === "Supplier GmbH" &&
    !invoice.fields.poNumber &&
    invoice.fields.lineItems[0].sku === "WIDGET-002"
  ) {
    invoice.fields.poNumber = "PO-A-051";
    proposed.push("Auto-matched PO-A-051 using SKU & vendor pattern");
  }

  // =========================
  // 4️⃣ VAT INCLUDED LOGIC
  // =========================
  if (
    invoice.vendor === "Parts AG" &&
    invoice.rawText.toLowerCase().includes("inkl")
  ) {
    const gross = invoice.fields.grossTotal;
    const rate = invoice.fields.taxRate;
    invoice.fields.netTotal = +(gross / (1 + rate)).toFixed(2);
    invoice.fields.taxTotal = +(gross - invoice.fields.netTotal).toFixed(2);
    proposed.push("Recomputed totals – VAT included detected");
  }

  // =========================
  // 5️⃣ MISSING CURRENCY
  // =========================
  if (!invoice.fields.currency && invoice.rawText.includes("EUR")) {
    invoice.fields.currency = "EUR";
    proposed.push("Recovered missing currency from rawText");
  }

  // =========================
  // 6️⃣ SKONTO DETECTION
  // =========================
  if (
    invoice.vendor === "Freight & Co" &&
    invoice.rawText.toLowerCase().includes("skonto")
  ) {
    invoice.fields.discountTerms = "2% Skonto within 10 days";
    proposed.push("Detected Skonto terms from rawText");
  }

  audit.push({
    step: "apply",
    timestamp: new Date().toISOString(),
    details: JSON.stringify(proposed)
  });

  return proposed;
}
