import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Ajv from 'ajv';
import { CustomLogger } from '../logger';

@Injectable()
export class JSONSchemaService {
  ajv: Ajv;
  constructor(private customLogger: CustomLogger) {
    this.init();
  }

  init() {
    try {
      this.ajv = new Ajv({
        strictSchema: true,
        strictNumbers: true,
        strictTypes: false,
        strictTuples: 'log',
        strictRequired: false,
      });
    } catch (error) {
      this.customLogger.error(`Json-schema error: ${error}`);
    }
  }

  validate(jsonSchema: any, jsonData: any): boolean {
    return this.ajv.validate(jsonSchema, jsonData);
  }
}
