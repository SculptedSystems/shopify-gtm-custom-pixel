// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#purchase
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed

import { getCouponFromDiscountApplications } from "@helpers/discount";
import { prepareItemsFromLineItems } from "@helpers/items";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerPurchase() {
  analytics.subscribe("checkout_completed", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice?.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice?.amount || 0;

    // parameter: customer_type
    const firstOrder = checkout.order?.customer?.isFirstOrder ?? true;
    const customer_type = firstOrder ? "new" : "returning";

    // parameter: transaction_id
    const transaction_id = event.id;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: shipping
    const shipping = checkout.shippingLine?.price.amount || 0;

    // parameter: tax
    const tax = checkout.totalTax.amount || 0;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "purchase",
      currency: currency,
      value: value,
      customer_type: customer_type,
      transaction_id: transaction_id,
      coupon: coupon,
      shipping: shipping,
      tax: tax,
      items: items,
    });
  });
}
