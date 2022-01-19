import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Wa Project Challenge')
    .setDescription(
      'This api is a proposed solution to the backend challenge at Wa Project relation a vacancy work',
    )
    .setVersion('1.0')
    .addTag('challenge')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.API_PORT || 3333);
}

bootstrap();
