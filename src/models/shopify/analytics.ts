/**
 * Shopify Web Pixels API - Analytics
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/analytics
 */

export interface Analytics {
  subscribe(
    eventName: string,
    event_callback: (event: AnalyticsEvent) => void,
  ): Promise<void>;
}

export interface AnalyticsEvent {
  clientId: string;
  context: Context | null;
  data: Data;
  id: string;
  name: string;
  seq: number;
  timestamp: string;
  type: EventType;
}

type Data = Record<string, unknown>;

enum EventType {
  AdvancedDom = "advanced-dom",
  Custom = "custom",
  Dom = "dom",
  Meta = "meta",
  Standard = "standard",
}

/**
 * Shopify Web Pixels API - checkout_address_info_submitted
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted
 */

export interface EventCheckoutAddressInfoSubmitted extends AnalyticsEvent {
  data: PixelEventsCheckoutAddressInfoSubmittedData;
  type: EventType.Standard;
}

interface PixelEventsCheckoutAddressInfoSubmittedData extends Data {
  checkout: Checkout;
}

/**
 * Shopify Web Pixels API - payment_info_submitted
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted
 */

export interface EventPaymentInfoSubmitted extends AnalyticsEvent {
  data: PixelEventsPaymentInfoSubmittedData;
  type: EventType.Standard;
}

interface PixelEventsPaymentInfoSubmittedData extends Data {
  checkout: Checkout;
}

/**
 * Shopify Web Pixels API - checkout_started
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started
 */

export interface EventCheckoutStarted extends AnalyticsEvent {
  data: PixelEventsCheckoutStartedData;
  type: EventType.Standard;
}

interface PixelEventsCheckoutStartedData extends Data {
  checkout: Checkout;
}

/**
 * Shopify Web Pixels API - collection_viewed
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed
 */

export interface EventCollectionViewed extends AnalyticsEvent {
  data: PixelEventsCollectionViewedData;
  type: EventType.Standard;
}

interface PixelEventsCollectionViewedData extends Data {
  collection: Collection;
}

/**
 * Shopify Web Pixels API - product_added_to_cart
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart
 */

export interface EventProductAddedToCart extends AnalyticsEvent {
  data: PixelEventsProductAddedToCartData;
  type: EventType.Standard;
}

interface PixelEventsProductAddedToCartData extends Data {
  cartLine: CartLine | null;
}

/**
 * Shopify Web Pixels API - page_viewed
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed
 */

export interface EventPageViewed extends AnalyticsEvent {
  data: PixelEventsPageViewedData;
  type: EventType.Standard;
}

interface PixelEventsPageViewedData extends Data {
  // Shopify: "No additional data is provided by design"
  data: null;
}

/**
 * Shopify Web Pixels API - cart_viewed
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed
 */

export interface EventCartViewed extends AnalyticsEvent {
  data: PixelEventsCartViewedData;
  type: EventType.Standard;
}

interface PixelEventsCartViewedData extends Data {
  cart: Cart | null;
}

/**
 * Shopify Web Pixels API - product_viewed
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed
 */

export interface EventProductViewed extends AnalyticsEvent {
  data: PixelEventsProductViewedData;
  type: EventType.Standard;
}

interface PixelEventsProductViewedData extends Data {
  productVariant: ProductVariant;
}

/**
 * Shopify Web Pixels API - checkout_completed
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed
 */

export interface EventCheckoutCompleted extends AnalyticsEvent {
  data: PixelEventsCheckoutCompletedData;
  type: EventType.Standard;
}

interface PixelEventsCheckoutCompletedData extends Data {
  checkout: Checkout;
}

/**
 * Shopify Web Pixels API - Common
 */

export interface Checkout {
  attributes: Attribute[];
  billingAddress: MailingAddress | null;
  buyerAcceptsEmailMarketing: boolean;
  buyerAcceptsSmsMarketing: boolean;
  currencyCode: string | null;
  delivery: Delivery | null;
  discountApplications: DiscountApplication[];
  discountsAmount: MoneyV2 | null;
  email: string | null;
  lineItems: CheckoutLineItem[];
  localization: Localization;
  order: Order | null;
  phone: string | null;
  shippingAddress: MailingAddress | null;
  shippingLine: ShippingRate | null;
  smsMarketingPhone: string | null;
  subtotalPrice: MoneyV2 | null;
  token: string | null;
  totalPrice: MoneyV2 | null;
  totalTax: MoneyV2;
  transactions: Transaction[];
}

export interface Attribute {
  key: string;
  value: string;
}

export interface MailingAddress {
  address1: string | null;
  address2: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  province: string | null;
  provinceCode: string | null;
  zip: string | null;
}

export interface Delivery {
  selectedDeliveryOptions: DeliveryOption[] | null;
}

export interface DeliveryOption {
  cost: MoneyV2 | null;
  costAfterDiscounts: MoneyV2 | null;
  description: string | null;
  handle: string;
  title: string | null;
  type: "pickup" | "pickupPoint" | "shipping" | "local";
}

export interface MoneyV2 {
  amount: number;
  currencyCode: string;
}

export interface DiscountApplication {
  allocationMethod: "ACROSS" | "EACH";
  targetSelection: "ALL" | "ENTITLED" | "EXPLICIT";
  targetType: "LINE_ITEM" | "SHIPPING_LINE";
  title: string;
  type: "AUTOMATIC" | "DISCOUNT_CODE" | "MANUAL" | "SCRIPT";
  value: MoneyV2 | PricingPercentageValue;
}

export interface PricingPercentageValue {
  percentage: number;
}

export interface PartialCheckoutLineItem {
  // not native to Shopify
  discountAllocations: DiscountAllocation[];
  finalLinePrice: MoneyV2 | null;
  quantity: number;
  variant: ProductVariant | null;
}

export interface CheckoutLineItem extends PartialCheckoutLineItem {
  finalLinePrice: MoneyV2;
  id: string;
  properties: Property[];
  sellingPlanAllocation: SellingPlanAllocation | null;
  title: string | null;
}

export interface DiscountAllocation {
  amount: MoneyV2;
  discountApplication: DiscountApplication;
}

export interface Property {
  key: string;
  value: string;
}

export interface SellingPlanAllocation {
  sellingPlan: SellingPlan;
}

export interface SellingPlan {
  id: string;
  name: string;
}

export interface ProductVariant {
  id: string | null;
  image: Image | null;
  price: MoneyV2;
  product: Product;
  sku: string | null;
  title: string | null;
  untranslatedTitle: string | null;
}

export interface Image {
  src: string | null;
}

export interface Product {
  id: string | null;
  title: string;
  type: string | null;
  untranslatedTitle: string | null;
  url: string | null;
  vendor: string;
}

export interface Localization {
  country: Country;
  language: Language;
  market: Market;
}

export interface Country {
  isoCode: string | null;
}

export interface Language {
  isoCode: string;
}

export interface Market {
  handle: string | null;
  id: string | null;
}

export interface Order {
  customer: OrderCustomer | null;
  id: string | null;
}

export interface OrderCustomer {
  id: string | null;
  isFirstOrder: boolean | null;
}

export interface ShippingRate {
  price: MoneyV2 | null;
}

export interface Transaction {
  amount: MoneyV2;
  gateway: string;
  paymentMethod: TransactionPaymentMethod;
}

export interface TransactionPaymentMethod {
  name: string;
  type:
    | "creditCard"
    | "redeemable"
    | "deferred"
    | "local"
    | "manualPayment"
    | "paymentOnDelivery"
    | "wallet"
    | "offsite"
    | "customOnSite"
    | "other";
}

export interface Collection {
  id: string;
  productVariants: ProductVariant[];
  title: string;
}

export interface CartLine {
  cost: CartLineCost;
  merchandise: ProductVariant;
  quantity: number;
}

export interface CartLineCost {
  totalAmount: MoneyV2;
}

export interface Cart {
  attributes: Attribute[];
  cost: CartLineCost;
  id: string | null;
  lines: CartLine[];
  totalQuantity: number;
}

/**
 Contex
 */

export interface Context {
  document: WebPixelsDocument;
  navigator: WebPixelsNavigator;
  window: WebPixelsWindow;
}

export interface WebPixelsDocument {
  characterSet: string;
  location: Location;
  referrer: string;
  title: string;
}

export interface Location {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
}

export interface WebPixelsNavigator {
  cookieEnabled: boolean;
  language: string;
  languages: string[];
  userAgent: string;
}

export interface WebPixelsWindow {
  innerHeight: number;
  innerWidth: number;
  location: Location;
  origin: string;
  outerHeight: number;
  outerWidth: number;
  pageXOffset: number;
  pageYOffset: number;
  screen: Screen;
  screenX: number;
  screenY: number;
  scrollX: number;
  scrollY: number;
}

export interface Screen {
  height: number;
  width: number;
}
