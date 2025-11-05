// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed

import { prepareItemsFromLineItems } from "@helpers/items";
import { prepareLineItemsFromProductObjects } from "@helpers/items";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerViewCart() {
  analytics.subscribe("cart_viewed", (event) => {
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
    const productObjects = [];
    cart.lines.forEach((line) => {
      productObjects.push({
        productVariant: line.merchandise,
        quantity: line.quantity,
        discountAllocations: [],
      });
    });

    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_cart",
      currency: currency,
      value: value,
      items: items,
    });
  });
}
