import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //아무 decorator도 없는 속성의 object를 거름
      forbidNonWhitelisted: true, //없는 필드보내면 사전에 request 막기
      transform: true, //유저들이 보낸 요청(무조건 string)을 원하는 타입으로 변환해줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
