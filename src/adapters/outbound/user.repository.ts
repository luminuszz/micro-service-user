import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/ports/usersRepository.contract';
import { CreateUserDTO } from '@adapters/inbound/dto/create-user';
import { UserEntity } from 'src/core/entities/user.entity';
import { PrismaService } from 'src/shared/prisma.service';
import { UpdateUserDTO } from '../inbound/dto/update-user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUser: CreateUserDTO): Promise<UserEntity> {
    return this.prismaService.user.create({
      data: createUser,
    });
  }

  async update(updateUser: UpdateUserDTO): Promise<UserEntity> {
    const { user_id, ...data } = updateUser;

    return this.prismaService.user.update({
      data: {
        ...data,
      },
      where: {
        id: user_id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
