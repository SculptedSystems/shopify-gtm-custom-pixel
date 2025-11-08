import { DataLayerMessage } from "@models/locals";
import { logger } from "@utils/logger";
import { stringifyObject } from "@utils/stringify";

export function dataLayerPush(message: DataLayerMessage): void {
  logger.info(`Pushing Message to Data Layer -> ${stringifyObject(message)}`);

  window.dataLayer.push(message);
}
