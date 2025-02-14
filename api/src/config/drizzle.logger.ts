import { Logger } from "drizzle-orm/logger";
import pino from "pino";
export class SqlLogger implements Logger {
  private logger: pino.Logger & { drizzle: pino.LogFn };
  constructor(logger: pino.Logger & { drizzle: pino.LogFn }) {
    this.logger = logger;
  }
  logQuery(query: string, params: unknown[]): void {
    this.logger.drizzle({ query, params });
  }
}
