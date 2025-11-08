import { CheckoutLineItem, MoneyV2 } from "@models/shopify";

export type PartialCheckoutLineItem = Pick<
  CheckoutLineItem,
  "discountAllocations" | "quantity" | "variant"
>;

export interface PartialCheckoutLineItemWithFinalLinePrice
  extends PartialCheckoutLineItem {
  finalLinePrice: MoneyV2 | null;
}
