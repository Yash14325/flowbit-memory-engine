🧠 Flowbit – Memory-Driven Invoice Intelligence System

Candidate: Dimili Yaswanth
Role: AI Agent Development Intern – Round-2 Assignment
Company: Flowbit Private Limited

📌 Overview

This project implements a Memory-Driven Learning Layer for invoice processing systems.

Instead of treating each invoice independently, the system:

Remembers vendor-specific patterns

Learns from repeated human corrections

Applies those learnings to future invoices

Maintains full explainability and auditability

Technology Stack

TypeScript (strict mode)

Node.js

SQLite (persistent learned memory)

No ML training – only explainable heuristics

🧩 Architecture
Invoice JSON Input
        ↓
   Recall Memory
        ↓
   Apply Memory
        ↓
   Decide (Auto / Escalate)
        ↓
   Learn from Human
        ↓
   SQLite Memory Store

🧠 Memory Types
1️⃣ VendorMemory

Stores vendor-specific patterns.

Vendor	Learned Pattern
Supplier GmbH	Leistungsdatum → serviceDate
Parts AG	VAT included detection
Freight & Co	Seefracht / Shipping → SKU FREIGHT
Parts AG	Recover missing currency from rawText
2️⃣ CorrectionMemory

Learns repeated correction strategies.

Quantity mismatch → Trust Delivery Note quantity

VAT included → Recalculate net / tax / gross

Description → SKU mapping

3️⃣ ResolutionMemory

Tracks outcomes of suggestions.

Action	Effect
Human Approved	+0.1 confidence
Human Rejected	−0.05 confidence

This prevents bad memory from dominating.

⚙ Decision Logic
Rule	Behavior
Confidence < 0.65	Escalate to human
Duplicate detected	Flag invoice
High-confidence memory	Auto-correct
Conflicting memory	Escalate
📤 Output Contract

Each invoice returns:

{
  "normalizedInvoice": {},
  "proposedCorrections": [],
  "requiresHumanReview": true,
  "reasoning": "",
  "confidenceScore": 0.0,
  "memoryUpdates": [],
  "auditTrail": []
}

🎬 Demo & Usage
Install dependencies
npm install

Run demo
npm run demo

Expected behavior

INV-A-001 → Missing serviceDate → escalated → learns vendor pattern

INV-A-002 → serviceDate auto-filled → no human review

This demonstrates persistent learning across runs using memory.db.

🗄 Persistence

All learned memory is stored in:

memory.db (SQLite)


Patterns survive application restarts.

🛡 Why This Prevents Hallucination Memory

Memory reinforced only after human approval

Low-confidence patterns decay automatically

Duplicate invoices never create memory

All actions are logged in auditTrail

🔧 Troubleshooting

Ensure npm install completes successfully

Delete memory.db to reset learned memory

👤 Author

Dimili Yaswanth
Flowbit Private Limited