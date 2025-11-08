// ============================
// Initialize Tracking
// ============================

import { config } from "@config";
import { logger } from "@utils/logger";

export function initializeGTM(): void {
  // Initialize Data Layer
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  (function (
    w: Window,
    d: Document,
    s: string,
    l: keyof Window,
    i: string,
  ): void {
    // Initialize GTM event
    w.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    // Grab the first <script> tag
    const firstScript = d.getElementsByTagName(s)[0];
    if (!firstScript?.parentNode) {
      logger.warn("No script tag found to insert before.");
      return;
    }

    // Create and insert the GTM script
    const gtmScript = d.createElement(s) as HTMLScriptElement;
    const dl = l !== "dataLayer" ? `&l=${l}` : "";

    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;

    firstScript.parentNode.insertBefore(gtmScript, firstScript);
  })(window, document, "script", "dataLayer", config.gtm.id);
}
