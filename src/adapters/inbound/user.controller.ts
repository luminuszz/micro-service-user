import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from 'src/core/services/user.service';
import { CreateUserDTO } from './dto/create-user';

@UsePipes(ValidationPipe)
@Controller()
export class UserConsumerController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern('create-user')
  async createUserConsumer(@Payload() createUser: CreateUserDTO) {
    await this.usersService.createUser(createUser);
  }
}
