// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart
import {
  EventProductAddedToCart,
  PartialCheckoutLineItem,
} from "@models/shopify";

import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { prepareItemsFromLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { logger } from "@utils/logger";

function handleAddToCart(event: EventProductAddedToCart) {
  const eventData = event.data;
  const cartLine = eventData.cartLine;

  if (!cartLine) {
    logger.debug("cartLine is null. Not pushing event.");
    return;
  }

  // parameter: currency
  const currency = cartLine.cost.totalAmount.currencyCode;

  // parameter: value
  const value = cartLine.cost.totalAmount.amount;

  // parameter: items
  const productVariant = cartLine.merchandise;
  const quantity = cartLine?.quantity || 0;
  const partialCheckoutLineItems: PartialCheckoutLineItem[] = [
    {
      discountAllocations: [],
      finalLinePrice: null,
      quantity: quantity,
      variant: productVariant,
    },
  ];
  const lineItems = addFinalLinePriceToPartialLineItems(
    partialCheckoutLineItems,
  );
  const items = prepareItemsFromLineItems(lineItems);

  dataLayerPush({
    event: "add_to_cart",
    currency: currency,
    value: value,
    items: items,
  });
}

export function registerAddToCart() {
  analytics.subscribe(
    "product_added_to_cart",
    buildEventHandler(handleAddToCart),
  );
}
