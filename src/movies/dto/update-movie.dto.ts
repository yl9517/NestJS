import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

//update는 create와 다르게 필수사항이 아님 : PartialType
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
