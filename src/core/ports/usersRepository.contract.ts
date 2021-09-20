import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '@adapters/inbound/dto/create-user';
import { UpdateUserDTO } from '@adapters/inbound/dto/update-user';

export abstract class UserRepository {
  abstract create(createUser: CreateUserDTO): Promise<UserEntity>;
  abstract update(updateUser: UpdateUserDTO): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | undefined>;
}
