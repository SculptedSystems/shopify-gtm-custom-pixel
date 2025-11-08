import { DiscountAllocation, DiscountApplication } from "@models/shopify";

function discountApplicationIsWholeCart(
  discountApplication: DiscountApplication,
): boolean {
  return discountApplication.targetSelection === "ALL";
}

function discountApplicationIsLineItem(
  discountApplication: DiscountApplication,
): boolean {
  return ["ENTITLED", "EXPLICIT"].includes(discountApplication.targetSelection);
}

function discountApplicationIsCouponCode(
  discountApplication: DiscountApplication,
): boolean {
  return discountApplication.type === "DISCOUNT_CODE";
}

function getCombinedCouponFromDiscountApplications(
  discountApplications: DiscountApplication[],
): string | null {
  return (
    discountApplications
      .filter((dApp) => discountApplicationIsCouponCode(dApp)) // filter for type is discount code
      .map((dApp) => dApp.title) // get the codes
      .sort((a: string, b: string) => a.localeCompare(b)) // sort alphabetically
      .join(",") || // comma separated string
    null
  );
}

export function getLineItemDiscountFromDiscountAllocations(
  discountAllocations: DiscountAllocation[],
): number | null {
  const lineItemdDiscountAllocations = discountAllocations.filter((dAllo) =>
    discountApplicationIsLineItem(dAllo.discountApplication),
  );

  let discount = 0;
  lineItemdDiscountAllocations.forEach((da) => {
    discount += da.amount.amount;
  });

  if (discount === 0) {
    return null;
  } else {
    return discount;
  }
}

export function getLineItemCouponFromDiscountAllocations(
  discountAllocations: DiscountAllocation[],
): string | null {
  const discountApplications = discountAllocations.map(
    (dAllo) => dAllo.discountApplication,
  );
  const lineItemDiscountApplications = discountApplications.filter((dApp) =>
    discountApplicationIsLineItem(dApp),
  );
  return getCombinedCouponFromDiscountApplications(
    lineItemDiscountApplications,
  );
}

export function getWholeCartCouponFromDiscountApplications(
  discountApplications: DiscountApplication[],
): string | null {
  const wholeCartDiscountApplications = discountApplications.filter((dApp) =>
    discountApplicationIsWholeCart(dApp),
  );
  return getCombinedCouponFromDiscountApplications(
    wholeCartDiscountApplications,
  );
}
