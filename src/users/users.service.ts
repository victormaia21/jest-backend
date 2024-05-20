import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    if (!user.email) {
      throw new BadRequestException('Email required');
    }

    if (!user.password) {
      throw new BadRequestException('Password required');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    if (user.password.length < 8) {
      throw new BadRequestException(
        'Password must be a minimum of 8 characters',
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async login(user: { email: string; password: string }): Promise<{
    token: string;
    id: number;
    message: string;
  }> {
    if (!user.email) {
      throw new BadRequestException('Email required');
    }

    if (!user.password) {
      throw new BadRequestException('Password required');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Email not found');
    }

    const passwordIsValid = await bcrypt.compare(
      user.password,
      existingUser.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: existingUser.id,
    });

    return {
      token,
      id: existingUser.id,
      message: 'User successfully authenticated',
    };
  }
}
