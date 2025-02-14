declare module "pino-colada" {
  import { IncomingMessage, ServerResponse } from "http";

  type LogObject = {
    level: number | string;
    time?: number;
    msg?: string;
    message?: string;
    name?: string;
    ns?: string;
    req?: IncomingMessage;
    res?: ServerResponse;
    statusCode?: number;
    responseTime?: number;
    elapsed?: number;
    method?: string;
    contentLength?: number;
    err?: Error;
    stack?: string;
  };

  function PinoColada(): string;
  function PinoColada(): (inputData?: string | LogObject) => string;

  function formatDate(instant: number): string;
  function formatLevel(level: string): string;
  function formatNs(name: string): string;
  function formatName(name: string): string;
  function formatMessage(obj: LogObject): string;
  function formatUrl(url: string): string;
  function formatMethod(method: string): string;
  function formatStatusCode(statusCode: number): string;
  function formatBundleSize(size: number): string;
  function formatLoadTime(time: number): string;
  function formatStack(stack: string): string;
  function formatErrorProp(err: Error): string;
  function noEmpty(str: string): boolean;

  export = PinoColada;
}
