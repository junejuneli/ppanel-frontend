type PricedPlan = Pick<API.Subscribe, "unit_price" | "discount">;

// 与结算端一致：选择可用的最优阶梯折扣，并舍去不足一分的金额。
export function planPriceCents(plan: PricedPlan, quantity: number): number {
  const percent = (plan.discount ?? []).reduce(
    (best, tier) =>
      tier.quantity > 0 &&
      quantity >= tier.quantity &&
      tier.discount >= 0 &&
      tier.discount <= best
        ? tier.discount
        : best,
    100
  );
  const [coefficient = "100", exponent = "0"] = String(percent)
    .toLowerCase()
    .split("e");
  const [whole = "0", fraction = ""] = coefficient.split(".");
  const scale = fraction.length - Number(exponent);
  const numerator =
    BigInt(whole + fraction) * 10n ** BigInt(Math.max(0, -scale));
  const denominator = 100n * 10n ** BigInt(Math.max(0, scale));
  return Number(
    (BigInt(plan.unit_price) * BigInt(quantity) * numerator) / denominator
  );
}
