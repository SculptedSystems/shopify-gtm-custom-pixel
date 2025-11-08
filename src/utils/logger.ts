import { config } from "@config";

type LogLevel = "error" | "warn" | "info" | "debug" | "none";

class Logger {
  private levelOrder: Record<LogLevel, number> = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  };

  private currentLevel: LogLevel;

  constructor() {
    this.currentLevel = (config.pixel.loglevel || "none") as LogLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      this.levelOrder[level] <= this.levelOrder[this.currentLevel] &&
      this.currentLevel !== "none"
    );
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `Custom Pixel "${config.pixel.name}" [${level.toUpperCase()}]: ${message}`;
  }

  log(level: LogLevel, message: string): void {
    if (!this.shouldLog(level)) return;
    switch (level) {
      case "error":
        console.error(this.formatMessage(level, message));
        break;
      case "warn":
        console.warn(this.formatMessage(level, message));
        break;
      default:
        console.log(this.formatMessage(level, message));
        break;
    }
  }

  error(msg: string): void {
    this.log("error", msg);
  }

  warn(msg: string): void {
    this.log("warn", msg);
  }

  info(msg: string): void {
    this.log("info", msg);
  }

  debug(msg: string): void {
    this.log("debug", msg);
  }
}

export const logger = new Logger();
