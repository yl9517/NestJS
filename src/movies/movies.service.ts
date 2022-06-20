import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[]{
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find(movie => movie.id === parseInt(id)); // +id 라고 써도 number타입 됨
  }
  deleteOne(id: string): boolean {
    this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  createOne(movieData: Movie): Movie{
     this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    });
    return this.movies[this.movies.length - 1];
  }

}
