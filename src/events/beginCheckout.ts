// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#begin_checkout
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started

import { prepareItemsFromLineItems } from "@helpers/items";
import { getCouponFromDiscountApplications } from "@helpers/discount";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerBeginCheckout() {
  analytics.subscribe("checkout_started", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice.amount;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "begin_checkout",
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    });
  });
}
