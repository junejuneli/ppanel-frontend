import { useQuery } from "@tanstack/react-query";
import { getV1PublicPortalSubscribe as getSubscription } from "@workspace/ui/services/user/user";
import { useTranslation } from "react-i18next";

export function useHomepagePlans(enabled: boolean) {
  const { i18n } = useTranslation();
  const { data = [] } = useQuery({
    enabled,
    queryKey: ["subscription", i18n.language],
    queryFn: async () => {
      const { data } = await getSubscription(
        { language: i18n.language },
        { skipErrorHandler: true }
      );
      return data.data?.list || [];
    },
  });

  return data;
}
