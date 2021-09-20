import { Provider } from '@nestjs/common';
import { UserRepository } from '@core/ports/usersRepository.contract';
import { UserService } from 'src/core/services/user.service';

export const UserServiceFactory: Provider = {
  provide: UserService,
  useFactory: (userRepository: UserRepository) =>
    new UserService(userRepository),

  inject: [UserRepository],
};
