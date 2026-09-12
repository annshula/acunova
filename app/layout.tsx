import type { Metadata, Viewport } from "next";
import { Figtree, Outfit, Parisienne } from "next/font/google";
import Script from "next/script";
import { ClarityAnalytics } from "@/components/analytics/ClarityAnalytics";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { TikTokPixel } from "@/components/analytics/TikTokPixel";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/providers/CartProvider";
import { LocalizationProvider } from "@/components/providers/LocalizationProvider";
import { Toaster } from "sonner";
import Footer from "@/components/sections/Footer";
import Nav from "@/components/sections/Nav";
import BackToTop from "@/components/ui/BackToTop";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font — no third-party request, no FOUT.
// The pairing comes straight off the brand poster: one geometric sans doing
// the headings and all UI chrome, a friendly humanist sans for reading, and
// a genuine calligraphic face for the single "Small Device. Big Relief."
// flourish. There is no serif anywhere — the previous editorial serif
// belonged to the reference build, not to this brand.
//   Outfit     -> font-display / font-label / font-mega
//   Figtree    -> font-sans (body copy)
//   Parisienne -> font-script (used at most once per page)
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
  preload: true,
});

// Decorative only, and never load-bearing for meaning — so it is not
// preloaded and never carries text a screen reader needs on its own.
const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
  preload: false,
});

/** Google Tag Manager container — loaded high in <head>, noscript after <body>. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const viewport: Viewport = {
  themeColor: "#fdfcfa",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Shares real words with the homepage H1 ("Real relief. No needles.") and
// its eyebrow ("Acupressure pen") — an SEO/AEO audit flags 0% title/H1 word
// overlap otherwise. Keeps the electric-acupuncture-pen keyword too.
const title = `${site.name} Acupressure Pen, Real Relief With No Needles`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: undefined,
  // Search terms this store actually competes for: the device category
  // itself, the pain complaints people search before they know the
  // category name, and the brand. No medical-claim keywords ("cure",
  // "treatment for…") — see content/copy.ts for the claim policy those
  // would break.
  keywords: [
    "acupuncture pen",
    "electric acupuncture pen",
    "acupressure pen",
    "meridian energy pen",
    "electronic acupuncture device",
    "TENS pen",
    "muscle tension relief device",
    "drug-free pain relief",
    "handheld massager",
    "acupressure massage pen",
    "neck and shoulder massager",
    "AccuPenPro",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "shopping",
  alternates: {
    canonical: "/",
    // Single-language site (en-US only, no i18n routes) — a self-referencing
    // hreflang is still a legitimate low-cost signal that this is the
    // canonical English version, and x-default covers any locale not listed.
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  // No app/icon.png for Next's auto-detection to pick up, so it's wired
  // explicitly to /public/icon-192.png and icon-512.png. app/favicon.ico and
  // both icon sizes are generated from public/brand/accupenpro-favicon.png,
  // the app-icon-style AP mark crop.
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: site.locale,
    // Reuses the existing homepage hero photo (no purpose-cut 1200x630 asset
    // exists yet) — real product photography beats no image at all for the
    // og:image / twitter:image checks. 1376x768 is close enough to the
    // canonical 1200x630 og:image ratio that platforms crop it cleanly.
    images: [
      {
        url: "/hero/linen-desktop.png",
        width: 1376,
        height: 768,
        alt: `${site.name} acupressure pen kit laid out on linen`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: "@accupenpro",
    images: ["/hero/linen-desktop.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${figtree.variable} ${parisienne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Third-party origins this page actually talks to — resolves DNS
            and (for the ones serving real payloads) opens the connection
            ahead of the request, instead of paying that cost on first use. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://analytics.tiktok.com" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Google Tag Manager — was a raw <script> in <head> (render-blocking:
            no async/defer on the inline bootstrap itself, even though the tag
            it injects loads async). next/script's afterInteractive strategy
            still fires immediately after hydration, before the page is
            interactive, so GA4/remarketing tags still see effectively every
            pageview, but the initial HTML parse is no longer blocked on it. */}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* Google Tag Manager (noscript), tracking fallback when JS is off. */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              // Hidden tracking pixel, not real content — sandboxed to the bare
              // minimum: it only needs to load ns.html, nothing script-driven.
              sandbox="allow-same-origin"
              title="Google Tag Manager (noscript)"
            />
          </noscript>
        )}
        <a
          href="#showcase"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <LocalizationProvider>
          <CartProvider>
            <Nav />
            {children}
            <Footer />
            <CartDrawer />
            <BackToTop />
          </CartProvider>
        </LocalizationProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              // Capped-width card (not a full pill) so a long product name
              // wraps/clamps instead of stretching the toast off-screen.
              toast:
                "flex max-w-[min(92vw,21rem)] items-center gap-3 rounded-2xl bg-ink px-4 py-3.5 shadow-(--shadow-lift)",
              icon: "m-0 shrink-0",
              // Text column must be allowed to shrink for the clamps below.
              content: "min-w-0 flex-1",
              // Title stays on its own single row (ellipsis if overlong).
              title: "block truncate text-[0.82rem] font-semibold text-white",
              // The description is the product name — cap it at two lines
              // with an ellipsis so a big title never inflates the toast.
              // NOTE: no `block` utility here — it would set display:block
              // and override line-clamp's required display:-webkit-box,
              // silently disabling the clamp.
              description:
                "mt-0.5 text-[0.78rem] leading-snug text-white/70 line-clamp-2",
            },
          }}
        />
        <ClarityAnalytics />
        <GoogleAnalytics />
        <MetaPixel />
        <TikTokPixel />
      </body>
    </html>
  );
}
