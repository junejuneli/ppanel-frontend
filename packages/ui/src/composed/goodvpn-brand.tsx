import { cn } from "@workspace/ui/lib/utils";

export const goodVPNBrand = {
  site_name: "GoodVPN",
  site_logo: "/favicon.svg",
};

export function GoodVPNBrand({ className }: { className?: string }) {
  return (
    <>
      <img
        alt={goodVPNBrand.site_name}
        className={cn("block h-auto dark:hidden", className)}
        height={64}
        src="/goodvpn-logo.svg"
        width={302}
      />
      <img
        alt={goodVPNBrand.site_name}
        className={cn("hidden h-auto dark:block", className)}
        height={64}
        src="/goodvpn-logo-dark.svg"
        width={302}
      />
    </>
  );
}
