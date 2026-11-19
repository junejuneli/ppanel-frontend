export function isRecommended(plan: { description?: string }): boolean {
  try { return JSON.parse(plan.description || "{}").recommended === true; } catch { return false; }
}
