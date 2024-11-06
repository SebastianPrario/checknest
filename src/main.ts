import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logMiddleware } from './middleware/loggerMiddleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Gestion de Cheques API')
    .setDescription('Api de Gestion de Cheques')
    .setVersion('1.0')
    .addTag('Rutas') // Puedes agregar etiquetas para agrupar tus endpoints
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(logMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      // esto define la personalizacion global del mensaje de error
      exceptionFactory(errors) {
        const cleanErrors = errors.map((error) => {
          return { propety: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'se han detectado estos errores',
          errors: cleanErrors,
        });
      },
    }),
  );
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
