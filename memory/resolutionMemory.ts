import { db } from "../db/memoryStore";

type ResolutionRow = {
  approved: number;
  rejected: number;
};

export function recordResolution(pattern: string, approved: boolean) {
  const row = db
    .prepare("SELECT approved, rejected FROM resolution_memory WHERE pattern=?")
    .get(pattern) as ResolutionRow | undefined;

  if (!row) {
    db.prepare(
      "INSERT INTO resolution_memory (pattern, approved, rejected) VALUES (?,?,?)"
    ).run(pattern, approved ? 1 : 0, approved ? 0 : 1);
  } else {
    db.prepare(
      "UPDATE resolution_memory SET approved=?, rejected=? WHERE pattern=?"
    ).run(
      row.approved + (approved ? 1 : 0),
      row.rejected + (approved ? 0 : 1),
      pattern
    );
    /*
    git init
git add .
git commit -m "Flowbit Memory Learning Engine"
git remote add origin https://github.com/Yash14325/flowbit-memory-engine
git push -u origin master
    */ 
  }
}
