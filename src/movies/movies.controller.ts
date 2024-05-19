import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Headers,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(
    @Body() movie: Movie,
    @Headers('authorization') authorization: string,
  ): Promise<Movie> {
    return this.moviesService.create(movie, authorization);
  }

  @Get()
  findAll(@Headers('authorization') authorization: string): Promise<Movie[]> {
    return this.moviesService.findAll(authorization);
  }

  @Delete(':id')
  deleteMovieById(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.moviesService.deleteMovieById(id, authorization);
  }

  @Put(':id')
  updateMovieById(
    @Param('id') id: string,
    @Body() movie: Movie,
    @Headers('authorization') authorization: string,
  ) {
    return this.moviesService.updateMovieById(id, movie, authorization);
  }
}
