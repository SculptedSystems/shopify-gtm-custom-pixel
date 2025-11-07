// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item_list
// https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed
import {
  PartialCheckoutLineItem,
  EventCollectionViewed,
} from "@models/shopify";

import { prepareItemsFromLineItems } from "@helpers/items";
import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleViewItemList(event: EventCollectionViewed) {
  const eventData = event.data;
  const productVariants = eventData.collection.productVariants;

  // parameter: currency
  const currency = productVariants[0]?.price.currencyCode || null;

  // parameter: items
  const partialCheckoutLineItems: PartialCheckoutLineItem[] = [];
  productVariants.forEach((productVariant) => {
    partialCheckoutLineItems.push({
      discountAllocations: [],
      finalLinePrice: null,
      quantity: 1,
      variant: productVariant,
    });
  });

  const lineItems = addFinalLinePriceToPartialLineItems(
    partialCheckoutLineItems,
  );
  const items = prepareItemsFromLineItems(lineItems);

  dataLayerPush({
    event: "view_item_list",
    currency: currency,
    items: items,
  });
}

export function registerViewItemList() {
  analytics.subscribe(
    "collection_viewed",
    buildEventHandler(handleViewItemList),
  );
}
