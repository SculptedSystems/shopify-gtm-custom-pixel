// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#begin_checkout
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started
import { EventCheckoutStarted } from "@models/shopify";

import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";
import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleBeginCheckout(event: EventCheckoutStarted): void {
  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode || undefined;

  // parameter: value
  const value = checkout.subtotalPrice?.amount || undefined;

  // parameter: coupon
  const coupon = getWholeCartCouponFromDiscountApplications(
    checkout.discountApplications,
  );

  // parameter: items
  const items = createGA4ItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  dataLayerPush({
    event: "begin_checkout",
    currency: currency,
    value: value,
    coupon: coupon,
    items: items,
  });
}

export function registerBeginCheckout(): void {
  analytics.subscribe(
    "checkout_started",
    buildEventHandler(handleBeginCheckout),
  );
}
