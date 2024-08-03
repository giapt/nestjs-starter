import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { JsonModule, LoggerModule } from "./global_modules";
import cors from "cors";
import { HealthModule } from "./modules/health";

const loadConditionModules = () => {
  const conditionModules = [] as any[];

  return conditionModules;
};

const corsConfig = cors({
  origin: "*",
  preflightContinue: false,
});

@Module({
  imports: [
    // Global module
    JsonModule,
    LoggerModule,

    // Modules
    HealthModule,

    // Background jobs
    ScheduleModule.forRoot(),
    ...loadConditionModules(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(corsConfig).forRoutes("");
  }
}
