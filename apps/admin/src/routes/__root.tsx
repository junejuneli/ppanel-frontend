import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@workspace/ui/components/sonner";
import { NavigationProgress } from "@workspace/ui/composed/navigation-progress";
import { TanStackQueryDevtools } from "@workspace/ui/integrations/tanstack-query-devtools";
import { getCookie } from "@workspace/ui/lib/cookies";
import { isBrowser } from "@workspace/ui/utils/index";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useGlobalStore } from "@/stores/global";
import { fetchInitialConfig } from "@/utils/bootstrap";

export const Route = createRootRouteWithContext()({
  component: () => {
    const { common, setCommon, getUserInfo } = useGlobalStore();
    useEffect(() => {
      const initializeApp = async () => {
        try {
          const configResponse = await fetchInitialConfig();
          if (configResponse.data?.data) {
            setCommon(configResponse.data.data);
          }
          try {
            if (getCookie("Authorization")) {
              await getUserInfo();
            }
          } catch {
            /* empty */
          }
        } catch (error) {
          console.error("Failed to initialize app:", error);
        }
      };

      initializeApp();
    }, []);

    const { site } = common;
    const title = site.site_name;
    const description = site.site_desc || "";
    const keywords = site.keywords || "";
    const url = isBrowser() ? window.location.href : "";

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
