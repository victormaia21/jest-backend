import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('movies')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiBody({
    schema: {
      example: {
        name: 'Victor',
        category: 'Action',
      },
    },
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
    schema: {
      example: [
        {
          id: 1,
          name: 'victor',
          category: 'Male',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  })
  create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all movies.',
    type: [Movie],
  })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Movie ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  deleteMovieById(@Param('id') id: string) {
    return this.moviesService.deleteMovieById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Movie ID' })
  @ApiBody({
    schema: {
      example: {
        name: 'Victor',
        category: 'Action',
      },
    },
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  updateMovieById(@Param('id') id: string, @Body() movie: Movie) {
    return this.moviesService.updateMovieById(id, movie);
  }
}
