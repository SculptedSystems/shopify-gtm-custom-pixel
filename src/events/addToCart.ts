// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart

import { prepareLineItemsFromProductObjects } from "@helpers/items";
import { prepareItemsFromLineItems } from "@helpers/items";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerAddToCart() {
  analytics.subscribe("product_added_to_cart", (event) => {
    const eventData = event.data;
    const cartLine = eventData.cartLine;

    // parameter: currency
    const currency = cartLine.cost.totalAmount.currencyCode;

    // parameter: value
    const value = cartLine.cost.totalAmount.amount;

    // parameter: items
    const productVariant = cartLine.merchandise;
    const quantity = cartLine.quantity;
    const productObjects = [
      {
        productVariant: productVariant,
        quantity: quantity,
        discountAllocations: [],
      },
    ];
    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "add_to_cart",
      currency: currency,
      value: value,
      items: items,
    });
  });
}
