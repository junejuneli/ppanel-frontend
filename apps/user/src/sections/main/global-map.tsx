import { CalendarDays, ChartNoAxesCombined, Layers3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlobalMap() {
  const { t } = useTranslation(["home", "home-sales"]);

  return (
    <section
      aria-labelledby="home-connection-title"
      className="grid overflow-hidden rounded-[1.75rem] bg-[#e8f8ee] text-[#193629] md:grid-cols-[1.05fr_0.95fr] dark:bg-[#182f24] dark:text-[#edfff3]"
    >
      <div className="relative isolate grid min-h-72 place-items-center overflow-hidden px-6 py-10 sm:min-h-88">
        <img
          alt=""
          className="-z-10 absolute inset-0 size-full object-cover"
          decoding="async"
          height={800}
          loading="lazy"
          src="/assets/images/goodvpn-alpine-valley.webp"
          width={1200}
        />
        <div
          aria-hidden="true"
          className="-z-10 absolute inset-0 bg-[#142d21]/45"
        />
        <div
          aria-hidden="true"
          className="w-full max-w-xs rounded-2xl border border-white/20 bg-[#182f25]/90 p-5 text-white shadow-xl backdrop-blur-md"
        >
          <div className="flex items-center gap-2 border-white/15 border-b pb-3 font-semibold">
            <img alt="" height={27} src="/favicon.svg" width={27} />
            GoodVPN
          </div>
          <ul className="grid gap-3 pt-4 text-sm text-white/90">
            <li className="flex items-center gap-3">
              <Layers3 className="size-4 text-[#a6edc1]" />
              {t("home-sales:accountPlan")}
            </li>
            <li className="flex items-center gap-3">
              <ChartNoAxesCombined className="size-4 text-[#a6edc1]" />
              {t("home-sales:accountUsage")}
            </li>
            <li className="flex items-center gap-3">
              <CalendarDays className="size-4 text-[#a6edc1]" />
              {t("home-sales:accountExpiry")}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-14">
        <h2
          className="max-w-[20ch] text-pretty font-semibold text-3xl leading-tight tracking-tight lg:text-4xl"
          id="home-connection-title"
        >
          {t("home_connection_title", "One place for your VPN subscription.")}
        </h2>
        <p className="mt-4 max-w-md text-pretty text-[#466357] leading-relaxed dark:text-[#bed7c9]">
          {t(
            "home_connection_description",
            "From your account, you can find setup guides, check your data usage, and see when your plan renews."
          )}
        </p>
      </div>
    </section>
  );
}
