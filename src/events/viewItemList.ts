// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item_list
// https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed

import { prepareItemsFromLineItems } from "@helpers/items";
import { prepareLineItemsFromProductObjects } from "@helpers/items";

import { dataLayerPush } from "@helpers/dataLayer";

export function registerViewItemList() {
  analytics.subscribe("collection_viewed", (event) => {
    const eventData = event.data;
    const productVariants = eventData.collection.productVariants;

    // parameter: currency
    const currency = productVariants[0].price.currencyCode;

    // parameter: items
    const productObjects = [];
    productVariants.forEach((productVariant) => {
      productObjects.push({
        productVariant: productVariant,
        quantity: 1,
        discountAllocations: [],
      });
    });

    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_item_list",
      currency: currency,
      items: items,
    });
  });
}
