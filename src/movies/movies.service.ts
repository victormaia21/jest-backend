import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private jwtService: JwtService,
  ) {}

  private async verifyAuthorization(authorization: string) {
    try {
      if (!authorization) {
        throw new BadRequestException('Token required');
      }

      const token = authorization.split(' ')[1];

      if (!token) {
        throw new BadRequestException('Token required');
      }

      const decode = this.jwtService.decode(token, {
        complete: true,
      });
      if (!decode) {
        throw new BadRequestException('Erro with payload');
      }
      const { id } = decode.payload;

      if (!id) {
        throw new BadRequestException('There was an error with the token.');
      }
      const userExisting = await this.moviesRepository.findBy({ id: id });

      if (!userExisting) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'There was some issue with the token.',
      );
    }
  }

  async create(movie: Movie, authorization: string) {
    await this.verifyAuthorization(authorization);

    if (!movie.name) {
      throw new BadRequestException('Name required');
    }

    if (!movie.category) {
      throw new BadRequestException('Category required');
    }

    if (!movie.gender) {
      throw new BadRequestException('Gender required');
    }

    return this.moviesRepository.save(movie);
  }

  async findAll(authorization: string) {
    this.verifyAuthorization(authorization);
    return this.moviesRepository.find();
  }

  async deleteMovieById(id: string, authorization: string) {
    this.verifyAuthorization(authorization);

    const newId = Number(id);
    const movieExisting = await this.moviesRepository.findOneBy({ id: newId });

    if (!movieExisting) {
      throw new NotFoundException('Movie not found');
    }

    this.moviesRepository.delete({ id: newId });

    return {
      message: 'Movie deleted successfully',
    };
  }

  async updateMovieById(id: string, movie: Movie, authorization: string) {
    this.verifyAuthorization(authorization);
    const newId = Number(id);
    const movieExisting = await this.moviesRepository.findOneBy({ id: newId });

    if (!movieExisting) {
      throw new NotFoundException('Movie not found');
    }

    await this.moviesRepository.update({ id: newId }, movie);

    return {
      message: 'Movie updated successfully',
    };
  }
}
