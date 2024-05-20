import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
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
    return this.moviesRepository.find();
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

    if (!movieExisting) {
      throw new NotFoundException('Movie not found');
    }

    await this.moviesRepository.update({ id: newId }, movie);

    return {
      message: 'Movie updated successfully',
    };
  }
}
