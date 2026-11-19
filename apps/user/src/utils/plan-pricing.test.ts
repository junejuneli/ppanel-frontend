import { describe, expect, it } from "vitest";
import { planPriceCents } from "./plan-pricing";

describe("套餐对照表价格", () => {
  it.each([
    [2900, 4900, 16900],
    [6900, 13900, 42900],
    [12900, 23900, 74900],
  ])("与阶梯结算金额一致（%i 分月付）", (monthly, quarterly, annual) => {
    const plan = {
      unit_price: monthly,
      discount: [
        [12, annual],
        [3, quarterly],
        [1, monthly],
      ].map(([quantity, total]) => ({
        quantity: quantity!,
        discount:
          Math.ceil((total! / (monthly * quantity!)) * 100 * 1e12) / 1e12,
      })),
    };
    expect(planPriceCents(plan, 1)).toBe(monthly);
    expect(planPriceCents(plan, 3)).toBe(quarterly);
    expect(planPriceCents(plan, 12)).toBe(annual);
  });
  it("按最优折扣计算，与服务端一样截断不足一分的金额", () => {
    const plan = {
      unit_price: 999,
      discount: [
        { quantity: 1, discount: 90 },
        { quantity: 3, discount: 85 },
      ],
    };
    expect(planPriceCents(plan, 3)).toBe(2547);
    expect(
      planPriceCents(
        {
          unit_price: 490,
          discount: [{ quantity: 3, discount: 33.33333333333334 }],
        },
        3
      )
    ).toBe(490);
    expect(
      planPriceCents(
        { unit_price: 100, discount: [{ quantity: 1, discount: 1e-7 }] },
        1
      )
    ).toBe(0);
  });
});
