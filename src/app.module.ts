import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/movie.entity';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: 'postgres' || process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [Movie, User],
      synchronize: true,
    }),
    MoviesModule,
    UsersModule,
  ],
})
export class AppModule {}
