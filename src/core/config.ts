// ============================
// Configure Options
// ============================

export const config = {
  pixel: {
    name: "demo",
    logging: true,
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: true,
  },

  gtm: {
    id: "GTM-PJKTL9FK",

    track: {
      pageView: true,
      viewItemList: true,
      viewItem: true,
      addToCart: true,
      viewCart: true,
      beginCheckout: true,
      addShippingInfo: true,
      addPaymentInfo: true,
      purchase: true,
    },
  },
} as const;
