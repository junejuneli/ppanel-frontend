import { describe, expect, it } from "vitest";
import { paymentIcon } from "./payment-icons";

describe("支付方式图标", () => {
  it.each([
    ["银行卡 · Stripe", "card"],
    ["支付宝 · Stripe", "alipay"],
    ["微信支付 · Stripe", "wechat"],
  ])("Stripe 渠道按支付方式显示图标：%s", (name, icon) => {
    expect(paymentIcon({ name, platform: "Stripe" })).toBe(
      `/assets/payment/goodvpn-${icon}.svg`
    );
  });
  it("保留后台配置的图标", () => {
    expect(
      paymentIcon({ name: "支付宝", platform: "Stripe", icon: "/custom.svg" })
    ).toBe("/custom.svg");
  });
});
