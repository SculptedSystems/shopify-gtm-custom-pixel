// ================================================
//   Shopify Custom GTM Pixel for Customer Events
// ================================================

// ============================
// Configure Options
// ============================

const config = {
  pixel: {
    name: "demo",
    logging: true,
  },

  shopify: {
    storeName: init.data.shop.name,
    useSku: true,
  },

  gtm: {
    id: "GTM-PJKTL9FK",

    track: {
      pageView: true,
      viewItemList: true,
      viewItem: true,
      addToCart: true,
      viewCart: true,
      beginCheckout: true,
      addShippingInfo: true,
      addPaymentInfo: true,
      purchase: true,
    },
  },
};

// ============================
// Initialize Tracking
// ============================

// Initialize Data Layer
window.dataLayer = window.dataLayer || [];

// Initialize Google Tag Manager
(function(w: Window, d: Document, s: string, l: string, i: string) {
  // Ensure the dataLayer exists
  (w as any)[l] = (w as any)[l] || [];
  (w as any)[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  // Grab the first <script> tag and create a new GTM script element
  const f = d.getElementsByTagName(s)[0];
  if (!f || !f.parentNode) {
    console.warn("GTM Pixel: No script tag found to insert before.");
    return;
  }

  const j = d.createElement(s) as HTMLScriptElement;
  const dl = l !== "dataLayer" ? "&l=" + l : "";

  // Set script attributes
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;

  // Insert GTM <script> before the first script tag
  f.parentNode.insertBefore(j, f);

})(window, document, "script", "dataLayer", config.gtm.id);


// ============================
// Declare Helper Functions
// ============================

function consoleLog(log: string) {
  if (config.pixel.logging) {
    console.log(`Custom Pixel "${config.pixel.name}": ${log}`);
  }
}

function dataLayerPush(message: object) {
  consoleLog(
    `Pushing Message to Data Layer -> ${JSON.stringify(message, null, 2)}`,
  );
  window.dataLayer.push(message);
}

function getCouponFromDiscountApplications(
  discountApplications,
  appliesToWholeCart: boolean,
) {
  const discountCodeApplications = discountApplications?.filter(
    (dApp) => dApp.type === "DISCOUNT_CODE",
  );

  let filteredApplications;
  if (appliesToWholeCart) {
    filteredApplications = discountCodeApplications.filter(
      (dApp) => dApp.targetSelection === "ALL",
    ); // discount for all lines
  } else {
    filteredApplications = discountCodeApplications.filter((dApp) =>
      ["ENTITLED", "EXPLICIT"].includes(dApp.targetSelection),
    ); // discount for some lines
  }

  return (
    filteredApplications
      .map((dApp) => dApp.title) // get the codes
      .sort((a: string, b: string) => a.localeCompare(b)) // sort alphabetically
      .join(",") || // comma separated string
    undefined
  );
}

function getCouponFromDiscountAllocations(
  discountAllocations,
  appliesToWholeCart: boolean,
) {
  const discountApplications = discountAllocations?.map(
    (dAllo) => dAllo.discountApplication,
  );

  return getCouponFromDiscountApplications(
    discountApplications,
    appliesToWholeCart,
  );
}

function prepareItemsFromLineItems(lineItems) {
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

function prepareLineItemsFromProductObjects(productVariantObjects) {
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

// ============================
// Push Enhanced Measurement Events to Data Layer
// ============================

if (config.gtm.track.pageView) {
  // https://support.google.com/analytics/answer/9216061#page_view
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed
  analytics.subscribe("page_viewed", (event) => {
    const eventContext = event.context?.document;

    // parameter: page_location
    const page_location = eventContext?.location?.href;

    // parameter: page_referrer
    const page_referrer = eventContext?.referrer;

    // parameter: page_title
    const page_title = eventContext?.title;

    dataLayerPush({
      event: "page_view",
      page_location: page_location,
      page_referrer: page_referrer,
      page_title: page_title,
    });
  });
}

// ============================
// Push Recommended Events to Data Layer
// ============================

if (config.gtm.track.viewItemList) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item_list
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed
  analytics.subscribe("collection_viewed", (event) => {
    const eventData = event.data;
    const productVariants = eventData.collection.productVariants;

    // parameter: currency
    const currency = productVariants[0].price.currencyCode;

    // parameter: items
    const productObjects = [];
    productVariants.forEach((productVariant) => {
      productObjects.push({
        productVariant: productVariant,
        quantity: 1,
        discountAllocations: [],
      });
    });

    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_item_list",
      currency: currency,
      items: items,
    });
  });
}

if (config.gtm.track.viewItem) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_item
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed
  analytics.subscribe("product_viewed", (event) => {
    const eventData = event.data;
    const productVariant = eventData.productVariant;

    // parameter: currency
    const currency = productVariant.price.currencyCode;

    // parameter: value
    const value = productVariant.price.amount;

    // parameter: items
    const productObjects = [
      {
        productVariant: productVariant,
        quantity: 1,
        discountAllocations: [],
      },
    ];
    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_item",
      currency: currency,
      value: value,
      items: items,
    });
  });
}

if (config.gtm.track.addToCart) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_to_cart
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart
  analytics.subscribe("product_added_to_cart", (event) => {
    const eventData = event.data;
    const cartLine = eventData.cartLine;

    // parameter: currency
    const currency = cartLine.cost.totalAmount.currencyCode;

    // parameter: value
    const value = cartLine.cost.totalAmount.amount;

    // parameter: items
    const productVariant = cartLine.merchandise;
    const quantity = cartLine.quantity;
    const productObjects = [
      {
        productVariant: productVariant,
        quantity: quantity,
        discountAllocations: [],
      },
    ];
    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "add_to_cart",
      currency: currency,
      value: value,
      items: items,
    });
  });
}

if (config.gtm.track.viewCart) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#view_cart
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed
  analytics.subscribe("cart_viewed", (event) => {
    const eventData = event.data;
    const cart = eventData.cart;

    if (!cart) {
      return;
    }

    // parameter: currency
    const currency = cart.cost.totalAmount.currencyCode;

    // parameter: value
    const value = cart.cost.totalAmount.amount;

    // parameter: items
    const productObjects = [];
    cart.lines.forEach((line) => {
      productObjects.push({
        productVariant: line.merchandise,
        quantity: line.quantity,
        discountAllocations: [],
      });
    });

    const lineItems = prepareLineItemsFromProductObjects(productObjects);
    const items = prepareItemsFromLineItems(lineItems);

    dataLayerPush({
      event: "view_cart",
      currency: currency,
      value: value,
      items: items,
    });
  });
}

if (config.gtm.track.beginCheckout) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#begin_checkout
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started
  analytics.subscribe("checkout_started", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice.amount;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "begin_checkout",
      currency: currency,
      value: value,
      coupon: coupon,
      items: items,
    });
  });
}

if (config.gtm.track.addShippingInfo) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted
  analytics.subscribe("checkout_address_info_submitted", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice?.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice?.amount || 0;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: shipping_tier
    const shipping_tier =
      checkout.delivery?.selectedDeliveryOptions?.[0]?.title || undefined;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "add_shipping_info",
      currency: currency,
      value: value,
      coupon: coupon,
      shipping_tier: shipping_tier,
      items: items,
    });
  });
}

if (config.gtm.track.addPaymentInfo) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_payment_info
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted
  analytics.subscribe("payment_info_submitted", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice?.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice?.amount || 0;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: payment_type
    const payment_type =
      checkout.transactions?.[0]?.paymentMethod.type || undefined;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "add_payment_info",
      currency: currency,
      value: value,
      coupon: coupon,
      payment_type: payment_type,
      items: items,
    });
  });
}

if (config.gtm.track.purchase) {
  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#purchase
  // https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed
  analytics.subscribe("checkout_completed", (event) => {
    const eventData = event.data;
    const checkout = eventData.checkout;

    // parameter: currency
    const currency = checkout.subtotalPrice?.currencyCode;

    // parameter: value
    const value = checkout.subtotalPrice?.amount || 0;

    // parameter: customer_type
    const firstOrder = checkout.order?.customer?.isFirstOrder ?? true;
    const customer_type = firstOrder ? "new" : "returning";

    // parameter: transaction_id
    const transaction_id = event.id;

    // parameter: coupon
    const coupon = getCouponFromDiscountApplications(
      checkout.discountApplications,
      true,
    );

    // parameter: shipping
    const shipping = checkout.shippingLine?.price.amount || 0;

    // parameter: tax
    const tax = checkout.totalTax.amount || 0;

    // parameter: items
    const items = prepareItemsFromLineItems(checkout.lineItems);

    dataLayerPush({
      event: "purchase",
      currency: currency,
      value: value,
      customer_type: customer_type,
      transaction_id: transaction_id,
      coupon: coupon,
      shipping: shipping,
      tax: tax,
      items: items,
    });
  });
}
