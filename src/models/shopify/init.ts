/**
 * Shopify Web Pixels API - Init event
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/init
 */

export interface Init {
  data: RegisterInitData;
}

export interface RegisterInitData {
  shop: Shop;
}

export interface Shop {
  countryCode: string;
  myshopifyDomain: string;
  name: string;
  paymentSettings: ShopPaymentSettings;
  storefrontUrl?: string;
}

export interface ShopPaymentSettings {
  currencyCode: string;
}
