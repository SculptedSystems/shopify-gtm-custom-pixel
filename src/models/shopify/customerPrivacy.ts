/**
 * Shopify Web Pixels API - Customer Privacy Interface
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/customerprivacy
 */

import { CustomerPrivacyData } from "@models/shopify";

export interface CustomerPrivacy {
  subscribe(
    eventName: string,
    event_callback: (event: CustomerPrivacyEvent) => void,
  ): Promise<void>;
}

export interface CustomerPrivacyEvent {
  customerPrivacy: CustomerPrivacyData;
}
