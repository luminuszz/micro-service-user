import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../ports/usersRepository.contract';
import { TestUtil } from '@shared/utils/Test.util';

const userRepositoryMock = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

describe('UsersService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useFactory: (userRepository: UserRepository) =>
            new UserService(userRepository),

          inject: [UserRepository],
        },
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);

    userRepositoryMock.create.mockClear();
    userRepositoryMock.findByEmail.mockClear();
    userRepositoryMock.update.mockClear();
  });

  it('should be able to  create a new user', async () => {
    const validUser = TestUtil.getValidUser({
      email: 'carlos@gmail.com',
      name: 'alago aqui',
    });

    userRepositoryMock.create.mockReturnValue(validUser);
    userRepositoryMock.findByEmail.mockReturnValue(undefined);

    const user = await userService.createUser({
      name: validUser.name,
      email: validUser.email,
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(validUser.name);
    expect(user.email).toBe(validUser.email);
  });

  it(' not should be able to  create a new user with email exists', async () => {
    const validUser = TestUtil.getValidUser({
      email: 'carlos@gmail.com',
      name: 'alago aqui',
    });

    userRepositoryMock.create.mockReturnValue(validUser);
    userRepositoryMock.findByEmail.mockReturnValue({ email: validUser.email });

    await expect(
      userService.createUser({
        name: validUser.name,
        email: validUser.email,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
