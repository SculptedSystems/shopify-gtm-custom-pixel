import { config } from "@core/config";

export function consoleLog(log: string) {
  if (config.pixel.logging) {
    console.log(`Custom Pixel "${config.pixel.name}": ${log}`);
  }
}
