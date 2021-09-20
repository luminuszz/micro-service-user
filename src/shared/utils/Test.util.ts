import * as faker from 'faker';
import { v4 } from 'uuid';

import { UserEntity } from '@core/entities/user.entity';

export class TestUtil {
  static getValidUser(values?: Partial<UserEntity>): UserEntity {
    return {
      id: v4(),
      created_at: new Date(),
      updated_at: new Date(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      ...values,
    };
  }
}
