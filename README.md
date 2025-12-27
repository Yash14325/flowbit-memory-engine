# 🧠 Flowbit — Memory-Driven Invoice Intelligence (Completed)

**Status:** ✅ **Completed** — the Memory-Driven Learning Layer has been implemented and tested (TypeScript, Node.js, SQLite).

---

## 📌 Overview

    This project implements a Memory-Driven Learning Layer for invoice processing systems.

    Instead of treating each invoice independently, the system:

        Remembers vendor-specific patterns

        Learns from repeated human corrections

        Applies those learnings to future invoices

        Maintains full explainability & auditability

    The solution is built entirely using:

        TypeScript (strict mode)

        Node.js

        SQLite (persistent learned memory)

        No ML training — only explainable heuristics.

🧩 Architecture

I   nvoice JSON Input
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

    Stores vendor-specific patterns:

    Vendor	            Learned Pattern
    Supplier GmbH	    Leistungsdatum → serviceDate
    Parts AG	        VAT included detection
    Freight & Co	    “Seefracht / Shipping” → SKU FREIGHT
    Parts AG	        Recover missing currency from rawText

    2️⃣ CorrectionMemory

    Learns repeated correction strategies:

    Quantity mismatch → Trust Delivery Note qty

    VAT included → Recalculate net/tax/gross

    Description → SKU mapping

    3️⃣ ResolutionMemory

T   Tracks outcome of suggestions:

    Action	Effect
    Human Approved	+0.1 confidence
    Human Rejected	-0.05 confidence

    This prevents bad memory from dominating.


⚙ Decision Logic
R   ule	Behavior
    Confidence < 0.65	Escalate to human
    Duplicate detected	Flag invoice
    High confidence memory	Auto-correct
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

🎬 Demo & Usage ✅

1. Install dependencies:

```bash
npm install
```

2. Run the demo:

```bash
npm run demo
```

Expected behavior (demo):

- `INV-A-001`: Missing `serviceDate` → escalated → learns vendor-specific pattern
- `INV-A-002`: `serviceDate` auto-filled → no human review

This demonstrates persistent learning across runs (memory stored in `memory.db`).

🗄 Persistence

Memory is stored in:

    memory.db (SQLite)


All vendor patterns and corrections survive application restarts.


🛡 Why This Prevents Hallucination Memory

Memory is reinforced only after human approval

Low-confidence patterns decay automatically

Duplicate invoices never create memory

All actions are logged in auditTrail


---

## 🔧 Quick Troubleshooting

- If the demo hangs, ensure `npm install` completed and Node is up-to-date.
- To reset learned memories, remove `memory.db` (this deletes persisted knowledge).

---

## 📤 Pushing this change to GitHub

If you'd like me to push this update, I can run the git commands for you (requires your repo auth). Otherwise, run these locally:

```bash
git add README.md
git commit -m "docs: update README — project completed and add push instructions"
# replace `main` with your branch name if different
git push origin main
```

---

## 👤 Author

Dimili Yaswanth — Flowbit Private Limited

---

