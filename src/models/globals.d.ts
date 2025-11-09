// ================================================
//   Global Declarations
// ================================================
import { Analytics, Init, DataLayer } from "@models";

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
