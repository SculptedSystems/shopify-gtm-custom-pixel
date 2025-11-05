// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item
// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed

import { prepareLineItemsFromProductObjects } from "@helpers/items";
import { prepareItemsFromLineItems } from "@helpers/items";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerViewItem() {
  analytics.subscribe("product_viewed", (event) => {
    const eventData = event.data;
    const productVariant = eventData.productVariant;

    // parameter: currency
    const currency = productVariant.price.currencyCode;

    // parameter: value
    const value = productVariant.price.amount;

    // parameter: items
    const productObjects = [
      {
        productVariant: productVariant,
        quantity: 1,
        discountAllocations: [],
      },
    ];
    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_item",
      currency: currency,
      value: value,
      items: items,
    });
  });
}
