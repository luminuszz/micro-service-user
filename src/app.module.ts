import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@shared/prisma.service';
import { UserRepositoryFactory } from '@adapters/factories/userRepository.factory';
import { UserServiceFactory } from '@adapters/factories/userService.factory';
import { UserConsumerController } from '@adapters/inbound/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserConsumerController],
  providers: [
    PrismaService,
    UserServiceFactory,
    UserRepositoryFactory,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
