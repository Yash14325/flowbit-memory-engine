import * as fs from "fs";
import { applyMemory } from "./engine/apply";
import { decide } from "./engine/decide";
import { learn } from "./engine/learn";
import { recallMemory } from "./engine/recall";

type Invoice = any;

function processInvoice(invoice: Invoice, humanCorrection: any | null) {
  const auditTrail: any[] = [];

  // 1️⃣ Recall
  const memory = recallMemory(invoice);
  auditTrail.push({
    step: "recall",
    timestamp: new Date().toISOString(),
    details: `Loaded vendor & correction memory for ${invoice.vendor}`
  });

  // 2️⃣ Apply
  const proposedCorrections = applyMemory(invoice, memory, auditTrail);

  // 3️⃣ Decide
  const autoAccepted = decide(invoice, proposedCorrections, auditTrail);

  // 4️⃣ Learn
  const memoryUpdates = learn(invoice, humanCorrection, auditTrail);

  return {
    normalizedInvoice: invoice.fields,
    proposedCorrections,
    requiresHumanReview: !autoAccepted,
    reasoning:
      proposedCorrections.length > 0
        ? "Vendor & correction memory applied with confidence > 0.65"
        : "No reliable memory found – escalated for human review",
    confidenceScore: autoAccepted ? 0.82 : 0.55,
    memoryUpdates,
    auditTrail
  };
}

// ▶ MAIN ENTRY
const invoices: Invoice[] = JSON.parse(fs.readFileSync("invoices_extracted.json", "utf-8"));
const corrections = JSON.parse(fs.readFileSync("human_corrections.json", "utf-8"));

console.log("\n🚀 FLOWBIT MEMORY ENGINE RUN STARTED\n");

for (const invoice of invoices.slice(0, 4)) {
  const human = corrections.find((c: any) => c.invoiceId === invoice.invoiceId) || null;
  const output = processInvoice(invoice, human);
  console.log(JSON.stringify(output, null, 2));
  console.log("\n------------------------------------------------\n");
}
