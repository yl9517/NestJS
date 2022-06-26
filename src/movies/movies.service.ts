import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie =  this.movies.find((movie) => movie.id === id); // +id 라고 써도 number타입 됨
    if(!movie){
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
    
  }

  createOne(movieData: CreateMovieDto): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies[this.movies.length - 1];
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  updateOne(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
    return this.movies[this.movies.length - 1];
  }
}
