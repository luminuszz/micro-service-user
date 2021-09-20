import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import 'dotenv/config';

(async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.MQ_URL],
        queue: process.env.MQ_QUEUE,
      },
    },
  );

  await app.listen();
})();
