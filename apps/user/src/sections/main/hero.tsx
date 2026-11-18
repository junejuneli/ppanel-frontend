import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero({ hasPlans }: { hasPlans: boolean }) {
  const { t } = useTranslation(["home", "home-sales"]);

  return (
    <section
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[34rem] items-end overflow-hidden rounded-[1.75rem] bg-[#10271c] text-white sm:min-h-[38rem] sm:items-center lg:min-h-[42rem]"
    >
      <picture className="absolute inset-0">
        <source
          media="(max-width: 639px)"
          srcSet="/assets/images/goodvpn-night-summit-mobile.webp"
        />
        <img
          alt=""
          className="size-full object-cover object-[58%_48%]"
          fetchPriority="high"
          height={1280}
          src="/assets/images/goodvpn-night-summit.webp"
          width={1920}
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,#10271c_0%,#163b2aea_25%,#28573d44_62%,transparent)] sm:bg-[linear-gradient(105deg,#0c2318_1%,#153c2be8_26%,#26765478_51%,#3798731c_74%,transparent_94%)]"
      />
      <div className="relative w-full px-6 pt-32 pb-10 sm:max-w-[44rem] sm:p-12 lg:p-16">
        <p className="mb-4 font-medium text-[#c2f7d4] text-sm">
          {t("home-sales:category")}
        </p>
        <h1
          className="whitespace-pre-line font-semibold text-[clamp(2.45rem,5vw,4.75rem)] leading-[1.06] tracking-[-0.045em]"
          id="home-title"
        >
          {t("home-sales:headline")}
        </h1>
        <p className="mt-5 max-w-md text-pretty text-base text-white/85 leading-relaxed sm:text-lg">
          {t("home-sales:description")}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {hasPlans ? (
            <>
              <button
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[#a7f3c7] px-5 font-semibold text-[#143c29] text-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                onClick={() => {
                  const plans = document.getElementById("home-plans");
                  plans?.focus({ preventScroll: true });
                  plans?.scrollIntoView({ block: "start" });
                }}
                type="button"
              >
                {t("home_view_plans", "View plans")}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
              <Link
                className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-[#10271c]/25 px-5 font-semibold text-sm text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                to="/auth"
              >
                {t("home_account", "Sign in or register")}
              </Link>
            </>
          ) : (
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a7f3c7] px-5 font-semibold text-[#143c29] text-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
              to="/auth"
            >
              {t("started", "Get started")}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
