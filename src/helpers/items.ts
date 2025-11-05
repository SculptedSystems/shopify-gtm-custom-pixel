import { config } from "@core/config";
import { getCouponFromDiscountAllocations } from "@helpers/discount";

export function prepareItemsFromLineItems(lineItems) {
  const items = [];

  lineItems.forEach((item, index_: number) => {
    // parameter: item_id
    const productId = item.variant.id;
    const productSku = item.variant.sku;
    const item_id = config.shopify.useSku ? productSku : productId;

    // parameter: item_name
    const item_name = item.variant.product.title;

    // parameter: affiliation
    const affiliation = config.shopify.storeName;

    // parameter: coupon
    const coupon = getCouponFromDiscountAllocations(
      item.discountAllocations,
      false,
    );

    // parameter: discount
    let discount = 0; // TODO: ensure this only applies for non-wholeCart discounts
    item.discountAllocations.forEach((da) => {
      discount += da.amount.amount;
    });

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
      item_variant: item_variant,
      price: price,
      quantity: quantity,
    });
  });

  return items;
}

export function prepareLineItemsFromProductObjects(productVariantObjects) {
  const lineItems = [];

  productVariantObjects.forEach((obj) => {
    lineItems.push({
      variant: obj.productVariant,
      finalLinePrice: obj.productVariant.price,
      quantity: obj.quantity,
      discountAllocations: obj.discountAllocations,
    });
  });

  return lineItems;
}
