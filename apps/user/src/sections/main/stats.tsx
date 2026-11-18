import { Link } from "@tanstack/react-router";
import { Globe2, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation("home-sales");
  const features = [
    {
      icon: ShieldCheck,
      title: t("privacyTitle"),
      description: t("privacyBody"),
      photo: "/assets/images/goodvpn-public-wifi.webp",
      height: 661,
    },
    {
      icon: Globe2,
      title: t("routesTitle"),
      description: t("routesBody"),
      photo: "/assets/images/goodvpn-route-landscape.webp",
      height: 870,
    },
    {
      icon: MonitorSmartphone,
      title: t("devicesTitle"),
      description: t("devicesBody"),
      photo: "/assets/images/goodvpn-device-workspace.webp",
      height: 800,
    },
  ];

  return (
    <section aria-labelledby="home-benefits-title">
      <h2
        className="mb-7 max-w-3xl text-pretty font-semibold text-3xl tracking-tight sm:mb-9 sm:text-5xl"
        id="home-benefits-title"
      >
        {t("benefitsTitle")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description, photo, height }) => (
          <article
            className="relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-3xl bg-[#142d21] p-6 text-white lg:min-h-80"
            key={title}
          >
            <img
              alt=""
              className="absolute inset-0 size-full object-cover"
              decoding="async"
              height={height}
              loading="lazy"
              src={photo}
              width={1000}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(0deg,#0d2419_0%,#152d22e8_27%,#1c3b2c82_56%,#163b2a12_95%)]"
            />
            <div className="relative">
              <Icon aria-hidden="true" className="size-5 text-[#b7fbd1]" />
              <h3 className="mt-3 font-semibold text-xl">{title}</h3>
              <p className="mt-2 max-w-[34ch] text-sm text-white/85 leading-relaxed">
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <Link
        className="mt-5 inline-flex min-h-10 items-center font-medium text-primary text-sm underline underline-offset-4 hover:opacity-80"
        to="/privacy-policy"
      >
        {t("privacyLink")}
      </Link>
    </section>
  );
}
