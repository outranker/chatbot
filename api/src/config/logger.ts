import { randomUUID } from "crypto";
import p from "pino";

const loggerOptions: p.LoggerOptions = {
  level: "trace",
  redact: {
    paths: ["req.headers.authorization", "pid", "hostname", "req.hostname", "req.remoteAddress", "req.remotePort"],
    remove: true,
  },
  customLevels: {
    systemLog: 32,
    console: 33,
    drizzle: 34,
    notFound: 51,
    customCatch: 52,
    axiosErr: 53,
  },
};
const transportOption = {
  target: "pino-pretty",
  options: {
    colorize: true,
  },
};

if (process.env.PRETTY_PRINT && process.env.PRETTY_PRINT === "true") {
  loggerOptions.transport = transportOption;
  loggerOptions.timestamp = () =>
    `,"time":"${new Date(Date.now()).toLocaleString("en-EN", {
      timeZone: "Asia/Seoul",
    })}"`;
}
let logger: p.Logger;
if (process.env.IS_SERVER === "yes") {
  logger = p(loggerOptions);
} else {
  loggerOptions.timestamp = () => `,"time":"${new Date().toISOString()}"`;
  logger = p(loggerOptions);
}

export const genReqId = () => {
  const id = randomUUID();
  return id;
};

export { logger };
