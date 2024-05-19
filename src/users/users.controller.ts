import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      example: {
        email: 'victor@gmail.com',
        password: '12345678',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: User,
  })
  async register(@Body() user: User) {
    return await this.usersService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'User email and password for authentication',
    schema: { example: { email: 'user@example.com', password: 'password123' } },
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully.',
    schema: {
      example: {
        token: 'jwt.token',
        id: 1,
        message: 'User successfully authenticated',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid email or password.' })
  async login(@Body() user: { email: string; password: string }) {
    return await this.usersService.login(user);
  }
}
