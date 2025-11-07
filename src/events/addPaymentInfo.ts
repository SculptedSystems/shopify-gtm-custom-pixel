// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_payment_info
// https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted
import { EventPaymentInfoSubmitted } from "@models/shopify";

import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";
import { prepareItemsFromLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleAddPaymentInfo(event: EventPaymentInfoSubmitted) {
  const eventData = event.data;
  const checkout = eventData.checkout;

  // parameter: currency
  const currency = checkout.subtotalPrice?.currencyCode;

  // parameter: value
  const value = checkout.subtotalPrice?.amount || 0;

  // parameter: coupon
  const coupon = getWholeCartCouponFromDiscountApplications(
    checkout.discountApplications,
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
}

export function registerAddPaymentInfo() {
  analytics.subscribe(
    "payment_info_submitted",
    buildEventHandler(handleAddPaymentInfo),
  );
}
