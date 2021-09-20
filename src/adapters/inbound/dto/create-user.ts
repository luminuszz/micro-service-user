import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDTO implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
