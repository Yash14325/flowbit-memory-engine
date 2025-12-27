🧠 Flowbit Memory-Driven Invoice Intelligence System :

    Candidate: Dimili Yaswanth
    Role: AI Agent Development Intern – Round 2 Assignment
    Company: Flowbit Private Limited

📌 Overview

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

🎬 Demo — Learning Over Time


        Run Demo
        npm install
        npm run demo


Expected Behavior
    Invoice	    Result

    INV-A-001	Missing serviceDate → Escalated → Learns Leistungsdatum
    INV-A-002	serviceDate auto-filled → No human review

This proves persistent learning across runs.

🗄 Persistence

Memory is stored in:

    memory.db (SQLite)


All vendor patterns and corrections survive application restarts.


🛡 Why This Prevents Hallucination Memory

Memory is reinforced only after human approval

Low-confidence patterns decay automatically

Duplicate invoices never create memory

All actions are logged in auditTrail


🏁 Conclusion

This system simulates a real-world intelligent invoice agent that:

Learns continuously

Reduces human workload

Remains fully explainable

Never blindly applies memory