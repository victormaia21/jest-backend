import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: User) {
    return await this.usersService.register(user);
  }

  @Post('login')
  async login(@Body() user: { email: string; password: string }) {
    return await this.usersService.login(user);
  }
}
