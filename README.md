Flowbit Memory Engine :

    This system learns invoice correction patterns over time using SQLite persistent memory.

Memory Types :

    VendorMemory: vendor specific label → field mapping.

    CorrectionMemory: repeated correction actions.

    ResolutionMemory: tracks human approvals.

Learning Model :

    Each approved correction increases confidence by +0.1, rejected decays by -0.05.

Demo :

    npm install
    npm run demo


Output shows INV-A-001 missing serviceDate, learns “Leistungsdatum”, INV-A-002 auto-fills it.

📟 Sample Terminal Output :

    "proposedCorrections": ["Filled serviceDate from Leistungsdatum"]
    "requiresHumanReview": false
    "memoryUpdates": ["Learned Leistungsdatum mapping"]