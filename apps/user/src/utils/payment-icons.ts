export function paymentIcon(method: {
  icon?: string;
  name: string;
  platform: string;
}): string {
  if (method.icon) return method.icon;
  const name = `${method.name} ${method.platform}`.toLowerCase();
  if (/alipay|支付宝/.test(name)) return "/assets/payment/goodvpn-alipay.svg";
  if (/wechat|weixin|微信/.test(name))
    return "/assets/payment/goodvpn-wechat.svg";
  if (/stripe|card|bank|银行卡/.test(name))
    return "/assets/payment/goodvpn-card.svg";
  return "/assets/payment/balance.svg";
}
