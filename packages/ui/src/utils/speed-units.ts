export type SpeedUnit = "Mbps" | "MB/s" | "bit/s";

// 管理端约定：1 MB/s 按 10 Mbps 换算，节点接口仍使用 Mbps。
const mbpsPerUnit: Record<SpeedUnit, number> = { Mbps: 1, "MB/s": 10, "bit/s": 0.000001 };
export function speedToMbps(value: number, unit: SpeedUnit): number {
  return Math.round(value * mbpsPerUnit[unit]);
}
export function speedFromMbps(value: number, unit: SpeedUnit): number {
  return Number((value / mbpsPerUnit[unit]).toFixed(6));
}
