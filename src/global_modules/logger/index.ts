import { Global, Module } from '@nestjs/common';
import { CustomLogger } from './main.logger';

@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
export * from './main.logger';
