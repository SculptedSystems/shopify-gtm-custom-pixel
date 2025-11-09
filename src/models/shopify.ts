import type {
  PixelEventsPageViewed,
  PixelEventsCartViewed,
  PixelEventsCheckoutAddressInfoSubmitted,
  PixelEventsCheckoutCompleted,
  PixelEventsCheckoutContactInfoSubmitted,
  PixelEventsCheckoutShippingInfoSubmitted,
  PixelEventsCheckoutStarted,
  PixelEventsCollectionViewed,
  PixelEventsFormSubmitted,
  PixelEventsInputBlurred,
  PixelEventsInputChanged,
  PixelEventsInputFocused,
  PixelEventsPaymentInfoSubmitted,
  PixelEventsProductAddedToCart,
  PixelEventsProductRemovedFromCart,
  PixelEventsProductViewed,
  PixelEventsSearchSubmitted,
  PixelEventsUiExtensionErrored,
  PixelEventsAlertDisplayed,
  PixelEventsAdvancedDomAvailable,
  PixelEventsAdvancedDomChanged,
  PixelEventsAdvancedDomClipboard,
  PixelEventsAdvancedDomFormSubmitted,
  PixelEventsAdvancedDomInputBlurred,
  PixelEventsAdvancedDomInputChanged,
  PixelEventsAdvancedDomInputFocused,
  PixelEventsAdvancedDomScrolled,
  PixelEventsAdvancedDomSelectionChanged,
  PixelEventsAdvancedDomWindowResized,
} from "@sculptedsystems/shopify-web-pixels-api-types";

export type AnalyticsEvent =
  | PixelEventsPageViewed
  | PixelEventsCartViewed
  | PixelEventsCheckoutAddressInfoSubmitted
  | PixelEventsCheckoutCompleted
  | PixelEventsCheckoutContactInfoSubmitted
  | PixelEventsCheckoutShippingInfoSubmitted
  | PixelEventsCheckoutStarted
  | PixelEventsCollectionViewed
  | PixelEventsFormSubmitted
  | PixelEventsInputBlurred
  | PixelEventsInputChanged
  | PixelEventsInputFocused
  | PixelEventsPaymentInfoSubmitted
  | PixelEventsProductAddedToCart
  | PixelEventsProductRemovedFromCart
  | PixelEventsProductViewed
  | PixelEventsSearchSubmitted
  | PixelEventsUiExtensionErrored
  | PixelEventsAlertDisplayed
  | PixelEventsAdvancedDomAvailable
  | PixelEventsAdvancedDomChanged
  | PixelEventsAdvancedDomClipboard
  | PixelEventsAdvancedDomFormSubmitted
  | PixelEventsAdvancedDomInputBlurred
  | PixelEventsAdvancedDomInputChanged
  | PixelEventsAdvancedDomInputFocused
  | PixelEventsAdvancedDomScrolled
  | PixelEventsAdvancedDomSelectionChanged
  | PixelEventsAdvancedDomWindowResized;

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

/**
 * Shopify Web Pixels API - Customer Privacy Interface
 * Source: https://shopify.dev/docs/api/web-pixels-api/standard-api/customerprivacy
 */

export interface CustomerPrivacy {
  subscribe(
    eventName: string,
    event_callback: (event: Event) => void,
  ): Promise<void>;
}
