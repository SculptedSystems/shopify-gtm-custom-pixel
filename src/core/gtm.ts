// ============================
// Initialize Tracking
// ============================

import { config } from "@core/config";

export function initializeGTM(): void {
  // Initialize Data Layer
  window.dataLayer = window.dataLayer || [];

  // Initialize Google Tag Manager
  (function (w: Window, d: Document, s: string, l: string, i: string) {
    // Ensure the dataLayer exists
    (w as any)[l] = (w as any)[l] || [];
    (w as any)[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    // Grab the first <script> tag and create a new GTM script element
    const f = d.getElementsByTagName(s)[0];
    if (!f || !f.parentNode) {
      console.warn("GTM Pixel: No script tag found to insert before.");
      return;
    }

    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== "dataLayer" ? "&l=" + l : "";

    // Set script attributes
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;

    // Insert GTM <script> before the first script tag
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", config.gtm.id);
}
