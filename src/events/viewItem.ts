// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item
// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed
import { EventProductViewed, PartialCheckoutLineItem } from "@models/shopify";

import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { prepareItemsFromLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";

function handleViewItem(event: EventProductViewed) {
  const eventData = event.data;
  const productVariant = eventData.productVariant;

  // parameter: currency
  const currency = productVariant.price.currencyCode;

  // parameter: value
  const value = productVariant.price.amount;

  // parameter: items
  const partialLineItems: PartialCheckoutLineItem[] = [
    {
      discountAllocations: [],
      finalLinePrice: null,
      quantity: 1,
      variant: productVariant,
    },
  ];
  const lineItems = addFinalLinePriceToPartialLineItems(partialLineItems);
  const items = prepareItemsFromLineItems(lineItems);

  dataLayerPush({
    event: "view_item",
    currency: currency,
    value: value,
    items: items,
  });
}

export function registerViewItem() {
  analytics.subscribe("product_viewed", buildEventHandler(handleViewItem));
}
