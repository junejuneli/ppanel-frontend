import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Laptop, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HomeGuide() {
  const { t } = useTranslation("home-guide");

  const steps = [
    { title: t("chooseTitle"), body: t("chooseBody") },
    { title: t("configureTitle"), body: t("configureBody") },
    { title: t("manageTitle"), body: t("manageBody") },
  ];

  const questions = [
    { question: t("vpnQuestion"), answer: t("vpnAnswer") },
    { question: t("devicesQuestion"), answer: t("devicesAnswer") },
    { question: t("plansQuestion"), answer: t("plansAnswer") },
    { question: t("helpQuestion"), answer: t("helpAnswer") },
  ];

  return (
    <>
      <section
        aria-labelledby="home-device-title"
        className="grid items-center gap-9 py-4 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <h2
            className="text-pretty font-semibold text-3xl tracking-tight sm:text-5xl"
            id="home-device-title"
          >
            {t("deviceTitle")}
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-muted-foreground leading-relaxed">
            {t("deviceBody")}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            <li className="flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-sm">
              <Laptop aria-hidden="true" className="size-4 text-primary" />
              {t("computers")}
            </li>
            <li className="flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-sm">
              <Smartphone aria-hidden="true" className="size-4 text-primary" />
              {t("phones")}
            </li>
          </ul>
        </div>
        <div
          aria-hidden="true"
          className="relative isolate grid min-h-64 place-items-center overflow-hidden rounded-[1.75rem] bg-[radial-gradient(ellipse_at_top_right,#b3f1cd,#e5f9ec_52%,#d3efdf)] px-5 py-10 sm:min-h-96 sm:px-12 dark:bg-[radial-gradient(ellipse_at_top_right,#2e6249,#1c392d_60%,#14291f)]"
        >
          <div className="-translate-x-3 relative w-[88%] max-w-[28rem] pt-2">
            <div className="overflow-hidden rounded-xl border-[#203b2f] border-[6px] bg-[#142b22] shadow-xl sm:border-[9px]">
              <img
                alt=""
                className="aspect-video w-full object-cover"
                decoding="async"
                height={586}
                loading="lazy"
                src="/assets/images/goodvpn-night-summit-mobile.webp"
                width={880}
              />
            </div>
            <div className="-translate-x-[3%] mx-auto h-2 w-[106%] rounded-b-full bg-[#3c5d50]" />
            <div className="absolute right-[-9%] bottom-[-5%] w-[25%] overflow-hidden rounded-[18%] border-[#203b2f] border-[4px] bg-[#172f25] shadow-xl sm:border-[6px]">
              <div className="grid aspect-[9/18] place-items-center bg-[linear-gradient(145deg,#246e49,#133728_68%)]">
                <img
                  alt=""
                  className="w-[65%]"
                  height={64}
                  loading="lazy"
                  src="/favicon.svg"
                  width={64}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-steps-title"
        className="rounded-[1.75rem] border bg-muted/40 px-6 py-10 sm:px-10 sm:py-14"
      >
        <h2
          className="font-semibold text-3xl tracking-tight sm:text-4xl"
          id="home-steps-title"
        >
          {t("stepsTitle")}
        </h2>
        <ol className="mt-7 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {steps.map(({ title, body }) => (
            <li className="border-primary/30 border-t pt-5" key={title}>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="home-faq-title"
        className="mx-auto grid gap-6 py-4 md:grid-cols-[0.55fr_1fr] md:gap-12"
      >
        <h2
          className="font-semibold text-3xl tracking-tight sm:text-4xl"
          id="home-faq-title"
        >
          {t("faqTitle")}
        </h2>
        <div className="divide-y divide-border border-y">
          {questions.map(({ question, answer }) => (
            <details className="group" key={question}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-2xl pr-7 pb-5 text-muted-foreground text-sm leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] bg-[linear-gradient(115deg,#123628,#216146)] px-7 py-9 text-white sm:px-12 sm:py-12">
        <h2 className="text-pretty font-semibold text-3xl tracking-tight sm:text-4xl">
          {t("startTitle")}
        </h2>
        <Link
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-[#143c29] text-sm transition-colors hover:bg-[#e6faee] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          to="/auth"
        >
          {t("startAction")}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </>
  );
}
