import { describe, expect, it } from "vitest";
import { speedFromMbps, speedToMbps } from "./speed-units";

describe("管理端限速单位", () => {
  it("按约定以 1:10 转换 MB/s，切换单位保留节点限速", () => {
    expect(speedToMbps(5, "MB/s")).toBe(50);
    expect(speedFromMbps(50, "MB/s")).toBe(5);
    expect(speedToMbps(speedFromMbps(50, "bit/s"), "bit/s")).toBe(50);
    expect(speedFromMbps(50, "bit/s")).toBe(50_000_000);
    expect(speedToMbps(0, "Mbps")).toBe(0);
  });
});
