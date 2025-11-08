import { Item } from "@models/ga4";
import {
  PartialCheckoutLineItem,
  PartialCheckoutLineItemWithFinalLinePrice,
} from "@models/helpers";

import { config } from "@config";

import {
  getLineItemCouponFromDiscountAllocations,
  getLineItemDiscountFromDiscountAllocations,
} from "@helpers/discount";

import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

export function createGA4ItemsFromShopifyCheckoutLineItems(
  lineItems: PartialCheckoutLineItem[],
): Item[] {
  const items: Item[] = [];

  lineItems.forEach((item, index_: number) => {
    if (!item.variant) {
      logger.debug(`item ${stringifyObject(item)} has no variant`);
      return;
    }
    // parameter: item_id
    const productId = item.variant.id;
    const productSku = item.variant.sku;
    const item_id = config.shopify.useSku ? productSku : productId;
    if (!item_id) {
      logger.debug(
        `item ${stringifyObject(item)} has neither variant.id nor variant.sku`,
      );
      return;
    }

    // parameter: item_name
    const item_name = item.variant.product.title;

    // parameter: affiliation
    const affiliation = config.shopify.storeName;

    // parameter: coupon
    const coupon = getLineItemCouponFromDiscountAllocations(
      item.discountAllocations,
    );

    // parameter: discount
    const discount = getLineItemDiscountFromDiscountAllocations(
      item.discountAllocations,
    );

    // parameter: index
    const index = index_;

    // parameter: item_brand
    const item_brand = item.variant.product.vendor;

    // parameter: item_category
    const item_category = item.variant.product.type;

    // parameter: item_variant
    const item_variant = item.variant.title;

    // parameter: price
    const price = item.variant.price.amount;

    // parameter: quantity
    const quantity = item.quantity;

    items.push({
      item_id: item_id,
      item_name: item_name,

      affiliation: affiliation,

      coupon: coupon,
      discount: discount,

      index: index,

      item_brand: item_brand,

      item_category: item_category,
      item_category2: null,
      item_category3: null,
      item_category4: null,
      item_category5: null,

      item_list_id: null,
      item_list_name: null,

      item_variant: item_variant,

      location_id: null,

      price: price,
      quantity: quantity,
    });
  });

  return items;
}

export function addFinalLinePriceToPartialLineItems(
  partialLineItems: PartialCheckoutLineItem[],
): PartialCheckoutLineItem[] {
  const lineItems: PartialCheckoutLineItemWithFinalLinePrice[] = [];

  partialLineItems.forEach((obj) => {
    lineItems.push({
      variant: obj.variant,
      finalLinePrice: obj.variant?.price || null,
      quantity: obj.quantity,
      discountAllocations: obj.discountAllocations,
    });
  });

  return lineItems;
}
