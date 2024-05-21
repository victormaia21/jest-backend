import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    if (!movie.name) {
      throw new BadRequestException('Name required');
    }

    if (!movie.category) {
      throw new BadRequestException('Category required');
    }

    return this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    const cacheMovie = await this.cacheManager.get<string>('movies');
    if (cacheMovie) {
      console.log('cache deu certo');
      return JSON.parse(cacheMovie);
    }
    const movies = await this.moviesRepository.find();
    await this.cacheManager.set('movies', JSON.stringify(movies), 30 * 1000);
    return movies;
  }

  async deleteMovieById(id: string): Promise<{ message: string }> {
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

  async updateMovieById(
    id: string,
    movie: Movie,
  ): Promise<{ message: string }> {
    const newId = Number(id);
    const movieExisting = await this.moviesRepository.findOneBy({ id: newId });
    console.log(movie);
    if (!movieExisting) {
      throw new NotFoundException('Movie not found');
    }

    await this.moviesRepository.update(id, movie);

    return {
      message: 'Movie updated successfully',
    };
  }
}
