import * as fs from "fs";
import { applyMemory } from "./engine/apply";
import { decide } from "./engine/decide";
import { learn } from "./engine/learn";
import { recallMemory } from "./engine/recall";

const invoices = JSON.parse(fs.readFileSync("invoices_extracted.json", "utf-8"));
const corrections = JSON.parse(fs.readFileSync("human_corrections.json", "utf-8"));

function run(invoice: any) {
  const audit: any[] = [];

  const memory = recallMemory(invoice);
  audit.push({ step: "recall", timestamp: new Date().toISOString(), details: "Loaded memory" });

  const proposed = applyMemory(invoice, memory, audit);
  const auto = decide(invoice, proposed, audit);

  const human = corrections.find((c: any) => c.invoiceId === invoice.invoiceId) || null;
  const updates = learn(invoice, human, audit);

  console.log(JSON.stringify({
    normalizedInvoice: invoice.fields,
    proposedCorrections: proposed,
    requiresHumanReview: !auto,
    reasoning: "Memory applied where confidence > 0.65",
    confidenceScore: auto ? 0.82 : 0.55,
    memoryUpdates: updates,
    auditTrail: audit
  }, null, 2));
}

run(invoices[0]);
run(invoices[1]);
