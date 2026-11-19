import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { useGlobalStore } from "@/stores/global";
import { planPriceCents } from "@/utils/plan-pricing";
import { isRecommended } from "@/utils/plans";

const periods = [
  { quantity: 12, days: 365, key: "annual" },
  { quantity: 3, days: 90, key: "quarterly" },
  { quantity: 1, days: 30, key: "monthly" },
] as const;

export function PriceComparison({ plans }: { plans: API.Subscribe[] }) {
  const { t } = useTranslation("home-sales");
  const symbol = useGlobalStore().common.currency?.currency_symbol ?? "";
  const cell = "px-4 py-6 text-left align-middle";
  const price = (plan: API.Subscribe, quantity: number, days: number) => {
    const cents = planPriceCents(plan, quantity);
    return (
      <>
        <div className="whitespace-nowrap font-semibold text-lg tabular-nums">
          <Display type="currency" value={cents} />
        </div>
        <div className="mt-1 whitespace-nowrap text-muted-foreground text-sm tabular-nums">
          {t("comparison.daily", {
            price: `${symbol}${(cents / 100 / days).toFixed(2)}`,
          })}
        </div>
      </>
    );
  };

  return (
    <section
      aria-labelledby="plan-comparison-title"
      className="mt-10 space-y-4"
      id="plan-comparison"
    >
      <h3
        className="text-balance font-semibold text-2xl sm:text-3xl"
        id="plan-comparison-title"
      >
        {t("comparison.title")}
      </h3>
      <p className="text-muted-foreground text-sm sm:hidden">
        {t("comparison.swipe")}
      </p>
      <div
        aria-describedby="plan-comparison-note"
        aria-labelledby="plan-comparison-title"
        className="overflow-x-auto rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-primary"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[64rem] border-collapse text-sm">
          <caption className="sr-only">{t("comparison.title")}</caption>
          <thead>
            <tr className="border-b bg-muted/40">
              <th
                className={cn(
                  cell,
                  "sticky left-0 z-10 min-w-40 bg-muted font-semibold"
                )}
                scope="col"
              >
                {t("comparison.plan")}
              </th>
              {periods.map((period) => (
                <th
                  className={cn(
                    cell,
                    "font-semibold",
                    period.quantity === 12 && "bg-primary/5 text-primary"
                  )}
                  key={period.key}
                  scope="col"
                >
                  {t(`comparison.${period.key}`)}
                  {period.quantity === 12 && (
                    <span className="mt-1 block text-xs">
                      {t("comparison.bestValue")}
                    </span>
                  )}
                </th>
              ))}
              <th className={cn(cell, "font-semibold")} scope="col">
                {t("comparison.traffic")}
              </th>
              <th className={cn(cell, "font-semibold")} scope="col">
                {t("comparison.speed")}
              </th>
              <th className={cn(cell, "font-semibold")} scope="col">
                {t("comparison.connections")}
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const recommended = isRecommended(plan);
              const trialQuantity = plan.discount?.[0]?.quantity ?? 1;
              return (
                <tr
                  className={cn(
                    "border-b last:border-0",
                    recommended && "bg-primary/5"
                  )}
                  key={plan.id}
                >
                  <th
                    className={cn(
                      cell,
                      "sticky left-0 z-10 bg-card font-semibold",
                      recommended && "bg-accent"
                    )}
                    scope="row"
                  >
                    <span className="block whitespace-nowrap">{plan.name}</span>
                    {recommended && (
                      <Badge className="mt-2">{t("recommended")}</Badge>
                    )}
                  </th>
                  {plan.one_time ? (
                    <td className={cell} colSpan={3}>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>{price(plan, trialQuantity, trialQuantity)}</div>
                        <div className="space-y-1 text-muted-foreground">
                          <p>
                            {t("comparison.trialDuration", {
                              days: trialQuantity,
                            })}
                          </p>
                          <p>{t("comparison.once")}</p>
                        </div>
                      </div>
                    </td>
                  ) : (
                    periods.map((period) => (
                      <td
                        className={cn(
                          cell,
                          period.quantity === 12 && "bg-primary/5"
                        )}
                        key={period.key}
                      >
                        {plan.unit_time === "Month" &&
                        (plan.discount?.some(
                          (tier) => tier.quantity === period.quantity
                        ) ||
                          (period.quantity === 1 &&
                            plan.show_original_price !== false))
                          ? price(plan, period.quantity, period.days)
                          : "—"}
                      </td>
                    ))
                  )}
                  <td className={cn(cell, "whitespace-nowrap tabular-nums")}>
                    {plan.traffic
                      ? `${(plan.traffic / 1024 ** 3).toLocaleString()} GB`
                      : t("comparison.unlimited")}
                    <span className="mt-1 block text-muted-foreground text-xs">
                      {t(
                        plan.one_time
                          ? "comparison.totalTraffic"
                          : "comparison.monthlyReset"
                      )}
                    </span>
                  </td>
                  <td className={cn(cell, "whitespace-nowrap tabular-nums")}>
                    {plan.speed_limit
                      ? `${plan.speed_limit} Mbps`
                      : t("comparison.unlimited")}
                  </td>
                  <td className={cn(cell, "tabular-nums")}>
                    {plan.device_limit || t("comparison.unlimited")}
                    <span className="mt-1 block whitespace-nowrap text-muted-foreground text-xs">
                      {t("comparison.ipCounting")}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p
        className="text-pretty text-muted-foreground text-sm"
        id="plan-comparison-note"
      >
        {t("comparison.note")}
      </p>
    </section>
  );
}
