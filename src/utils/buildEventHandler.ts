import { logger } from "./logger";
import { stringifyObject } from "./stringify";
import { AnalyticsEvent, AnalyticsEventHandler } from "@models";

export function buildEventHandler<T extends AnalyticsEvent>(
  handler: AnalyticsEventHandler<T>,
): AnalyticsEventHandler {
  return (event: AnalyticsEvent) => {
    logger.debug(stringifyObject(event));
    handler(event as T);
  };
}
