// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed
import { EventCartViewed, PartialCheckoutLineItem } from "@models/shopify";

import { prepareItemsFromLineItems } from "@helpers/items";
import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleViewCart(event: EventCartViewed) {
  const eventData = event.data;
  const cart = eventData.cart;

  if (!cart) {
    return;
  }

  // parameter: currency
  const currency = cart.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cart.cost.totalAmount.amount;

  // parameter: items
  const partialLineItems: PartialCheckoutLineItem[] = [];
  cart.lines.forEach((line) => {
    partialLineItems.push({
      discountAllocations: [],
      finalLinePrice: null,
      quantity: line.quantity,
      variant: line.merchandise,
    });
  });

  const lineItems = addFinalLinePriceToPartialLineItems(partialLineItems);
  const items = prepareItemsFromLineItems(lineItems);

  dataLayerPush({
    event: "view_cart",
    currency: currency,
    value: value,
    items: items,
  });
}

export function registerViewCart() {
  analytics.subscribe("cart_viewed", buildEventHandler(handleViewCart));
}
