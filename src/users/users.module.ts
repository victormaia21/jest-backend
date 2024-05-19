import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.API_TOKEN_SECRET}`,
      global: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporte o serviço para que ele possa ser usado em outros módulos
})
export class UsersModule {}
