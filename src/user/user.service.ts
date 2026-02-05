import { Injectable } from '@nestjs/common';
import User from '../types/user';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      nickname: 'john1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    },
    {
      id: 2,
      nickname: 'maria1',
      name: 'Maria Smith',
      email: 'maria.smith@example.com',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.nickname === username);
  }
}
