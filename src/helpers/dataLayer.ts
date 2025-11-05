import { consoleLog } from "@core/log";

export function dataLayerPush(message: object) {
  consoleLog(
    `Pushing Message to Data Layer -> ${JSON.stringify(message, null, 2)}`,
  );
  window.dataLayer.push(message);
}
