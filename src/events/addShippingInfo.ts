// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info
// https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted
import { EventCheckoutAddressInfoSubmitted } from "@models/shopify";

import { getWholeCartCouponFromDiscountApplications } from "@helpers/discount";
import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleAddShippingInfo(event: EventCheckoutAddressInfoSubmitted): void {
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

  // parameter: shipping_tier
  const shipping_tier =
    checkout.delivery?.selectedDeliveryOptions?.[0]?.title || undefined;

  // parameter: items
  const items = createGA4ItemsFromShopifyCheckoutLineItems(checkout.lineItems);

  dataLayerPush({
    event: "add_shipping_info",
    currency: currency,
    value: value,
    coupon: coupon,
    shipping_tier: shipping_tier,
    items: items,
  });
}

export function registerAddShippingInfo(): void {
  analytics.subscribe(
    "checkout_address_info_submitted",
    buildEventHandler(handleAddShippingInfo),
  );
}
