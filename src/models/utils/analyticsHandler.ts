import type { AnalyticsEvent } from "@models/shopify";

/**
 * A handler function for analytics events.
 *
 * Generic over `T` to support specific event payloads
 * (e.g. PaymentInfoSubmittedEvent extends AnalyticsEvent).
 */
export type AnalyticsEventHandler<T extends AnalyticsEvent = AnalyticsEvent> = (
  event: T,
) => void | Promise<void>;
