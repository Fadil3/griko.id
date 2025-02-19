import * as React from "react";

import Footer from "~components/footer";
import KeybindsCheatsheet from "~components/keybinds-cheatsheet/lazy";
import MobileDrawer from "~components/mobile-drawer/lazy";
import Navbar from "~components/navbar";
import siteConfig from "~config/site";
import meta from "~generated/meta.json";
import useFathom from "~hooks/use-fathom";
import useFathomEvents from "~hooks/use-fathom-events";
import useKeybinds from "~hooks/use-keybinds";
import useNProgress from "~hooks/use-nprogress";
import { useCheatsheetSyncSetup } from "~store/global";

import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";

function LayoutSubscriptions() {
  useCheatsheetSyncSetup();
  useFathom();
  useFathomEvents();
  useKeybinds();
  useNProgress();

  return null;
}

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        {meta.site.favicon.map((f, key) => React.createElement(f.tag, { key, ...f.attributes }, null))}
      </Head>

      <DefaultSeo
        canonical={siteConfig.siteUrl + (router.asPath || "")}
        defaultTitle={meta.site.seo.fallback.title}
        description={meta.site.seo.fallback.description}
        openGraph={{
          type: "website",
          site_name: meta.site.seo.siteName,
          images: [meta.site.seo.fallback.image],
        }}
        twitter={{
          cardType: meta.site.seo.fallback.twitterCard,
          handle: meta.site.seo.twitterAccount,
          site: meta.site.seo.twitterAccount,
        }}
      />

      <SocialProfileJsonLd
        name={meta.site.seo.siteName}
        sameAs={Object.values(meta.about.socialsJson)}
        type="person"
        url={siteConfig.siteUrl}
      />

      <Flex flexDir="column" minH="100vh">
        <Navbar />
        <Box key={router.asPath} flexGrow={1}>
          {children}
        </Box>
        <Footer />
        <MobileDrawer />
        <KeybindsCheatsheet />
      </Flex>

      <LayoutSubscriptions />
    </>
  );
}
