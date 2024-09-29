import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logMiddleware } from './middleware/loggerMiddleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}
bootstrap();
