import { useEffect } from "react";

import analyticsConfig from "~config/analytics";
import siteConfig from "~config/site";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";

function handleRouteChangeComplete() {
  Fathom.trackPageview();
}

export default function useFathom() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(analyticsConfig.fathomSiteId, {
      includedDomains: [siteConfig.domain],
    });

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
