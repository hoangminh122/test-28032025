import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interceptors/response-exception.filter';
import { ConfigEnvironmentService } from './modules/base/config/config-environment.base.service';
import { ENDPOINT_PATH } from './utils/constants/endpoint-path.constant';
export const APP_AUTH_FORMAT = 'JWT';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('api-docs')
    .setDescription('api-docs')
    .setVersion('2.0')
    .addBearerAuth()
    .addTag(ENDPOINT_PATH.DEVICE.BASE)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/swagger', app, document, {
    customSiteTitle: 'metric-tracking',
  });

  console.log(`process-pid: ${process.pid}`);
  await app.listen(ConfigEnvironmentService.getIns().get('PORT') || 4000);
}
bootstrap();
