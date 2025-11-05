// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_payment_info
// https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted

import { prepareItemsFromLineItems } from "@helpers/items";
import { getCouponFromDiscountApplications } from "@helpers/discount";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerAddPaymentInfo() {
  analytics.subscribe("payment_info_submitted", (event) => {
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

    // parameter: payment_type
    const payment_type =
      checkout.transactions?.[0]?.paymentMethod.type || undefined;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "add_payment_info",
      currency: currency,
      value: value,
      coupon: coupon,
      payment_type: payment_type,
      items: items,
    });
  });
}
