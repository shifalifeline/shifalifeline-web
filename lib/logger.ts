type LogLevel =
  | "info"
  | "warn"
  | "error"
  | "debug";

class Logger {
  info(message: string, data?: unknown) {
    console.info(
      `[INFO] ${message}`,
      data ?? ""
    );
  }

  warn(message: string, data?: unknown) {
    console.warn(
      `[WARN] ${message}`,
      data ?? ""
    );
  }

  error(message: string, data?: unknown) {
    console.error(
      `[ERROR] ${message}`,
      data ?? ""
    );
  }

  debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        `[DEBUG] ${message}`,
        data ?? ""
      );
    }
  }

  log(
    level: LogLevel,
    message: string,
    data?: unknown
  ) {
    this[level](message, data);
  }
}

export const logger = new Logger();