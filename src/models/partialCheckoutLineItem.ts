import {
  CheckoutLineItem,
  MoneyV2,
} from "@sculptedsystems/shopify-web-pixels-api-types";

export type PartialCheckoutLineItem = Pick<
  CheckoutLineItem,
  "discountAllocations" | "quantity" | "variant"
>;

export interface PartialCheckoutLineItemWithFinalLinePrice
  extends PartialCheckoutLineItem {
  finalLinePrice: MoneyV2 | null;
}
