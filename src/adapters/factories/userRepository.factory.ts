import { Provider } from '@nestjs/common';
import { UserRepository } from '@core/ports/usersRepository.contract';
import { PrismaUserRepository } from '../outbound/user.repository';

export const UserRepositoryFactory: Provider = {
  provide: UserRepository,
  useClass: PrismaUserRepository,
};
