import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CONFIGURACIÓN DE SWAGGER
  const config = new DocumentBuilder()
    .setTitle('SENA - Gestión de Ambientes')
    .setDescription('API para la gestión de materiales, centros y áreas')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Esta es la ruta mágica

  await app.listen(3000);
}
bootstrap();