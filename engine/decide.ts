export function decide(invoice: any, proposed: string[], audit: any[]) {
  const requiresHuman = proposed.length === 0;
  audit.push({ step: "decide", timestamp: new Date().toISOString(), details: requiresHuman ? "Escalated" : "Auto-corrected" });
  return !requiresHuman;
}
