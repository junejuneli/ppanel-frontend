import { isRecommended } from "@/utils/plans";
import { Badge } from "@workspace/ui/components/badge";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import type { Key, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { SubscribeDetail } from "@/sections/subscribe/detail";
import { useGlobalStore } from "@/stores/global";

import { PriceComparison } from "./price-comparison";

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const { t } = useTranslation(["home", "home-sales"]);
  const { user } = useGlobalStore();

  const unitTimeMap: Record<string, string> = {
    Day: t("Day", "Day"),
    Hour: t("Hour", "Hour"),
    Minute: t("Minute", "Minute"),
    Month: t("Month", "Month"),
    NoLimit: t("NoLimit", "No Limit"),
    Year: t("Year", "Year"),
  };

  return (
    <section
      aria-labelledby="home-plans-title"
      className="scroll-mt-24 rounded-[1.75rem] border border-primary/15 bg-[linear-gradient(160deg,#eaf8f0,#fbfefc)] p-5 sm:p-10 dark:bg-[linear-gradient(160deg,#162d23,#111f18)]"
      id="home-plans"
      tabIndex={-1}
    >
      <h2
        className="text-center font-semibold text-3xl tracking-tight lg:text-5xl"
        id="home-plans-title"
      >
        {t("home-sales:planTitle")}
      </h2>
      <p className="mt-3 mb-7 text-center text-muted-foreground sm:mb-10">
        {t("home-sales:planBody")}
      </p>
      <div className="mx-auto flex flex-wrap justify-center gap-4 sm:gap-6">
        {subscriptionData.map((item) => (
          <Card
            className={cn("flex w-full max-w-sm flex-col gap-0 overflow-hidden rounded-2xl border-border/80 bg-card py-0 shadow-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]", { "border-primary ring-2 ring-primary": isRecommended(item) })}
            key={item.id}
          >
            <CardHeader className="gap-3 border-border/70 border-b px-6 py-5">
              <h3 className="flex items-center justify-between font-semibold text-lg">{item.name} {isRecommended(item) && <Badge>{t("home-sales:recommended", "Recommended")}</Badge>}</h3>
              {(() => {
                const hasDiscount = item.discount && item.discount.length > 0;
                const shouldShowOriginal = item.show_original_price !== false;

                const displayPrice =
                  shouldShowOriginal || !hasDiscount
                    ? item.unit_price
                    : Math.round(
                        item.unit_price *
                          (item.discount?.[0]?.quantity ?? 1) *
                          ((item.discount?.[0]?.discount ?? 100) / 100)
                      );

                const displayQuantity =
                  shouldShowOriginal || !hasDiscount
                    ? 1
                    : (item.discount?.[0]?.quantity ?? 1);

                const unitTime =
                  unitTimeMap[item.unit_time!] ||
                  t(item.unit_time || "Month", item.unit_time || "Month");

                return (
                  <p className="font-semibold text-4xl tracking-tight">
                    <Display type="currency" value={displayPrice} />
                    <span className="ml-1 font-medium text-muted-foreground text-sm">
                      {item.unit_time === "Month" && displayQuantity === 12 ? `/${t("annualUnit", "year")}` : displayQuantity === 1
                        ? `/${unitTime}`
                        : `/${displayQuantity} ${unitTime}`}
                    </span>
                  </p>
                );
              })()}
            </CardHeader>
            <CardContent className="flex flex-grow flex-col gap-4 p-6 text-sm">
              <ul className="flex flex-grow flex-col gap-3">
                {(() => {
                  let parsedDescription: {
                    description: string;
                    features: Array<{
                      icon: string;
                      label: ReactNode;
                      type: "default" | "success" | "destructive";
                    }>;
                  };
                  try {
                    parsedDescription = JSON.parse(item.description);
                  } catch {
                    parsedDescription = { description: "", features: [] };
                  }

                  const { description, features } = parsedDescription;
                  return (
                    <>
                      {description && (
                        <li className="text-muted-foreground">{description}</li>
                      )}
                      {features?.map(
                        (
                          feature: {
                            type: string;
                            icon: string;
                            label: ReactNode;
                          },
                          index: Key
                        ) => (
                          <li
                            className={cn("flex items-center gap-2", {
                              "text-muted-foreground line-through":
                                feature.type === "destructive",
                            })}
                            key={index}
                          >
                            {feature.icon && (
                              <Icon
                                className={cn("size-5 text-primary", {
                                  "text-green-500": feature.type === "success",
                                  "text-destructive":
                                    feature.type === "destructive",
                                })}
                                icon={feature.icon}
                              />
                            )}
                            {feature.label}
                          </li>
                        )
                      )}
                    </>
                  );
                })()}
              </ul>
              <SubscribeDetail
                subscribe={{
                  ...item,
                  name: undefined,
                }}
              />
            </CardContent>
            <CardFooter className="mt-auto px-6 pt-1 pb-6">
              {item.sell === false ? (
                <Button className="min-h-11 w-full rounded-full" disabled>
                  {t("home-sales:unavailablePlan")}
                </Button>
              ) : (
                <Button asChild className="min-h-11 w-full rounded-full">
                  <Link
                    search={user ? undefined : { id: item.id }}
                    to={user ? "/subscribe" : item.one_time ? "/auth" : "/purchasing"}
                  >
                    {t("home-sales:selectPlan")}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <PriceComparison plans={subscriptionData} />
    </section>
  );
}
