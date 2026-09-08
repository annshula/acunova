import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    // Matched to the live palette (app/globals.css --color-canvas /
    // --color-primary), not left at the Next.js scaffold default. This
    // controls the splash screen and status bar colour when the site is
    // added to a home screen, so a stale white here is a real visible bug
    // the moment someone installs the PWA, not just an unused field.
    background_color: "#f4fefb",
    theme_color: "#0f846e",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
