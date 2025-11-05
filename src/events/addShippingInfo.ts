// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted

import { prepareItemsFromLineItems } from "@helpers/items";
import { getCouponFromDiscountApplications } from "@helpers/discount";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerAddShippingInfo() {
  analytics.subscribe("checkout_address_info_submitted", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice?.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice?.amount || 0;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: shipping_tier
    const shipping_tier =
      checkout.delivery?.selectedDeliveryOptions?.[0]?.title || undefined;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "add_shipping_info",
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    });
  });
}
