import Header from "../components/Scaffolding/Header";
import { MDXProvider } from "@mdx-js/react";
import P from "../components/Markdown/P";
import "../styles/globals.css";
import Li from "../components/Markdown/Li";
import Ul from "../components/Markdown/Ul";
import H1 from "../components/Markdown/H1";
import H2 from "../components/Markdown/H2";
import H3 from "../components/Markdown/H3";
import Wikilink from "../components/Markdown/Wikilink";
import A from "../components/Markdown/A";
import Ol from "../components/Markdown/Ol";
import Pre from "../components/Markdown/Pre";
import Blockquote from "../components/Markdown/Blockquote";
import "littlefoot/dist/littlefoot.css";
import Script from "next/script";
import Footer from "components/Scaffolding/Footer";
import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FATHOM_TRACKING_CODE = "PTBGXOPS";
const PRODUCTION_DOMAIN = "arcana.computer";

function App({ Component, pageProps }) {
  const router = useRouter();

  // Cargo-culted from https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel.
  useEffect(() => {
    Fathom.load(FATHOM_TRACKING_CODE, {
      includedDomains: [PRODUCTION_DOMAIN],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div className="bg-background">
      <Header />
      <div className="max-w-prose md:mx-auto mx-4">
        <MDXProvider
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            p: P,
            pre: Pre,
            li: Li,
            ul: Ul,
            ol: Ol,
            a: A,
            blockquote: Blockquote,
            del: Wikilink,
          }}
        >
          <Component {...pageProps} />
          <Script
            id="initialize-littlefoot"
            src="https://unpkg.com/littlefoot/dist/littlefoot.js"
            onLoad={() => {
              littlefoot.littlefoot();
            }}
          />
        </MDXProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
