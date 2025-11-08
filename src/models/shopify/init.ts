/**
 * Shopify Web Pixels API - Init event
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/init
 */

import { Cart, Context } from "@models/shopify";

export interface Init {
  data: RegisterInitData;
  context: Context;
  customerPrivacy: CustomerPrivacyData;
}

export interface CustomerPrivacyData {
  analyticsProcessingAllowed: boolean;
  marketingAllowed: boolean;
  preferencesProcessingAllowed: boolean;
  saleOfDataAllowed: boolean;
}

export interface RegisterInitData {
  cart: Cart | null;
  customer: Customer;
  purchasingCompany: PurchasingCompany | null;
  shop: Shop;
}

export interface Customer {
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  ordersCount: number | null;
  phone: string | null;
}

export interface PurchasingCompany {
  company: PurchasingCompanyCompany;
  location: PurchasingCompanyLocation;
}

export interface PurchasingCompanyCompany {
  externalId: string | null;
  id: string;
  name: string;
}
export interface PurchasingCompanyLocation {
  externalId: string | null;
  id: string;
  name: string;
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
