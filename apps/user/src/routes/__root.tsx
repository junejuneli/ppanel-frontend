import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@workspace/ui/components/sonner";
import { NavigationProgress } from "@workspace/ui/composed/navigation-progress";
import { TanStackQueryDevtools } from "@workspace/ui/integrations/tanstack-query-devtools";
import { getCookie } from "@workspace/ui/lib/cookies";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "sonner";
import { useGlobalStore } from "@/stores/global";
import { fetchInitialConfig } from "@/utils/bootstrap";

export const Route = createRootRouteWithContext()({
  component: () => {
    const { clearUserLoading, common, getUserInfo, setCommon, setCommonError } =
      useGlobalStore();
    useEffect(() => {
      const initializeApp = async () => {
        try {
          const config = await fetchInitialConfig();
          setCommon(config);
        } catch (error) {
          console.error("Failed to initialize app:", error);
          setCommonError(
            error instanceof Error
              ? error.message
              : "Unknown configuration error"
          );
          toast.error(
            "Failed to load site configuration. Please refresh and try again."
          );
        }

        try {
          if (getCookie("Authorization")) {
            await getUserInfo();
          } else {
            clearUserLoading();
          }
        } catch {
          clearUserLoading();
        }
      };

      initializeApp();
    }, []);

    const { site } = common;
    const title = `${site.site_name} | VPN plans and setup guides`;
    const description =
      (site.site_desc && site.site_desc.trim() !== site.site_name
        ? site.site_desc
        : "") ||
      "Compare GoodVPN subscription plans, set up a compatible VPN client, and manage your data usage and subscription in one account.";
    const keywords = site.keywords || "";
    const url = "https://goodvpn.app/";

    return (
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta content={description} name="description" />
          <meta content={keywords} name="keywords" />
          <link href={url} rel="canonical" />
        </Helmet>
        <NavigationProgress />
        <Outlet />
        <Toaster closeButton richColors />
        <div
          dangerouslySetInnerHTML={{ __html: common?.site.custom_html || "" }}
          id="custom_html"
        />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </HelmetProvider>
    );
  },
});
