import { CreateUserDTO } from '@adapters/inbound/dto/create-user';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../ports/usersRepository.contract';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUser: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(createUser.email);

    if (user) {
      throw new Error('User already exists');
    }

    return this.userRepository.create(createUser);
  }
}
