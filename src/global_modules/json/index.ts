import { Global, Module } from '@nestjs/common';
import { JSONSchemaService } from './json-schema.service';

@Global()
@Module({
  providers: [JSONSchemaService],
  exports: [JSONSchemaService],
})
export class JsonModule {}
