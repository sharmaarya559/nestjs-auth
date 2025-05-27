import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  users = [];

  getHello(): string {
    return 'Hello World!';
  }

  async findUser(body: CreateUserDto) {
    const user = this.users.find((item) => item?.email === body?.email);
    if (user) return user;
    this.users.push({ id: this.users.length + 1, ...body });
    return { id: this.users.length + 1, ...body };
  }

  async login(userId: number) {}
}
