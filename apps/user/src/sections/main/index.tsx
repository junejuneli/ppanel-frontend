import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGlobalStore } from "@/stores/global";
import { GlobalMap } from "./global-map";
import { Hero } from "./hero";
import { HomeGuide } from "./home-guide";
import { useHomepagePlans } from "./product-showcase";
import { Content as ProductShowcase } from "./product-showcase/content";
import { Stats } from "./stats";

export default function Main() {
  const { user, isLoadingUser } = useGlobalStore();
  const navigate = useNavigate();

  const showLanding = import.meta.env.VITE_SHOW_LANDING_PAGE !== "false";

  const plans = useHomepagePlans(showLanding && !user);

  useEffect(() => {
    // Wait for user info to load before making navigation decisions
    if (isLoadingUser) {
      return;
    }

    if (user) {
      navigate({ to: "/dashboard" });
      return;
    }

    if (!showLanding) {
      navigate({ to: "/auth" });
    }
  }, [user, isLoadingUser, navigate, showLanding]);

  if (!showLanding) return null;

  return (
    <main className="container max-w-[86rem] space-y-10 pt-5 pb-14 sm:space-y-16 sm:pt-8 sm:pb-20">
      <Hero hasPlans={plans.length > 0} />
      <Stats />
      {plans.length > 0 && <ProductShowcase subscriptionData={plans} />}
      <GlobalMap />
      <HomeGuide />
      <nav
        aria-label="Public guides"
        className="flex flex-wrap justify-center gap-4 text-sm underline"
      >
        <a href="/guides/en/" lang="en">
          Setup and subscription guide
        </a>
        <a href="/guides/zh/" lang="zh-CN">
          中文使用指南
        </a>
      </nav>
    </main>
  );
}
