import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  
  // @Get("search")
  // search(@Query('year') searchingYear: number){
  //   return `We are seearching for a movie made after: ${searchingYear}`;
  // }
  
  @Get(":id")
  getOne(@Param("id") movieId: string): Movie{
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData){
    return this.moviesService.createOne(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: string){
    return this.moviesService.deleteOne(movieId);
  }

 // @Patch() : 리소스의 일부분만 업데이트 / @Put : 전체 movies 업데이트
  @Patch(":id")
  path(@Param("id") movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData
    };
  }

}
