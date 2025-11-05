// ================================================
//   Global Declarations 
// ================================================

declare global {

  // ============================
  // Shopify Pixel Runtime
  // ============================

  declare const analytics: {
    subscribe: (eventName: string, handler: (event: any) => void) => void;
  };

  declare const init: {
    data: {
      shop: {
        name: string;
      };
    };
  };

  // ============================
  // Google Tag Manager
  // ============================

  interface Window {
    dataLayer: any[];
  }

}

export { };
