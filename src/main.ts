import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { globalConfig } from './infra/global.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger)

  await app.listen(globalConfig.Server.port);
}

bootstrap();
