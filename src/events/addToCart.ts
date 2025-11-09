// https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart
// https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart

import { PixelEventsProductAddedToCart } from "@sculptedsystems/shopify-web-pixels-api-types";
import { PartialCheckoutLineItem } from "@models";

import { addFinalLinePriceToPartialLineItems } from "@helpers/items";
import { createGA4ItemsFromShopifyCheckoutLineItems } from "@helpers/items";
import { dataLayerPush } from "@helpers/dataLayer";

import { buildEventHandler } from "@utils/buildEventHandler";
import { logger } from "@utils/logger";

function handleAddToCart(event: PixelEventsProductAddedToCart): void {
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
      quantity: quantity,
      variant: productVariant,
    },
  ];
  const lineItems = addFinalLinePriceToPartialLineItems(
    partialCheckoutLineItems,
  );
  const items = createGA4ItemsFromShopifyCheckoutLineItems(lineItems);

  dataLayerPush({
    event: "add_to_cart",
    currency: currency,
    value: value,
    items: items,
  });
}

export function registerAddToCart(): void {
  analytics.subscribe(
    "product_added_to_cart",
    buildEventHandler(handleAddToCart),
  );
}
