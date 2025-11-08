// ================================================
//   Global Declarations
// ================================================
import { Analytics, Init } from "@models/shopify";
import { DataLayer } from "@models/locals";

export {};

declare global {
  // ============================
  // Shopify Web Pixels Runtime
  // ============================
  const init: Init;
  const analytics: Analytics;

  // ============================
  // Google Tag Manager Runtime
  // ============================
  interface Window {
    dataLayer: DataLayer;
  }
}
