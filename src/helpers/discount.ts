function discountApplicationIsWholeCart(discountApplication) {
  return discountApplication.targetSelection === "ALL";
}

function discountApplicationIsLineItem(discountApplication) {
  return ["ENTITLED", "EXPLICIT"].includes(discountApplication.targetSelection);
}

function discountApplicationIsCouponCode(discountApplication) {
  return discountApplication.type === "DISCOUNT_CODE";
}

function getCombinedCouponFromDiscountApplications(discountApplications) {
  return (
    discountApplications
      .filter((dApp) => discountApplicationIsCouponCode(dApp)) // filter for type is discount code
      .map((dApp) => dApp.title) // get the codes
      .sort((a: string, b: string) => a.localeCompare(b)) // sort alphabetically
      .join(",") || // comma separated string
    undefined
  );
}

export function getLineItemDiscountFromDiscountAllocations(
  discountAllocations,
) {
  const lineItemdDiscountAllocations = discountAllocations.filter((dAllo) =>
    discountApplicationIsLineItem(dAllo.discountApplication),
  );

  let discount = 0;
  lineItemdDiscountAllocations.forEach((da) => {
    discount += da.amount.amount;
  });

  if (discount === 0) {
    return undefined;
  } else {
    return discount;
  }
}

export function getLineItemCouponFromDiscountAllocations(discountAllocations) {
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
  discountApplications,
) {
  const wholeCartDiscountApplications = discountApplications.filter((dApp) =>
    discountApplicationIsWholeCart(dApp),
  );
  return getCombinedCouponFromDiscountApplications(
    wholeCartDiscountApplications,
  );
}
