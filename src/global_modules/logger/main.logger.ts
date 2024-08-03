import { Injectable, LoggerService } from "@nestjs/common";
import { isObject } from "lodash";
import config from "src/config";
import { ENV_TYPE } from "src/constants";

declare const process: any;

export type LogLevel = "log" | "error" | "warn" | "debug" | "verbose";

@Injectable()
export class CustomLogger implements LoggerService {
  error(message: any, ...optionalParams: any[]) {
    this.printMessage("error", message);
  }

  log(message: any, ...optionalParams: any[]) {
    this.printMessage("log", message);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.printMessage("warn", message);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (
      config?.ENV_PROJECT != ENV_TYPE.DEV &&
      config?.ENV_PROJECT != ENV_TYPE.STG
    ) {
      return;
    }

    this.printMessage("debug", message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.printMessage("verbose", message);
  }

  private printMessage(level: LogLevel, message: any) {
    const output = isObject(message) ? JSON.stringify(message) : message;

    const timestamp = new Date(Date.now()).toLocaleString();
    process.stdout.write(`[${level}] ${timestamp} ${output}\n`);
  }
}
