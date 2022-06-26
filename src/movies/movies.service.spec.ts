import { NotFoundException } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe("getAll", () =>{
     it("should return an array", () =>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
     })
  })

  describe("getOne",() => {

    it("should return a movie", () => {
      service.createOne({
        title: "Test movie",
        genres:['test'],
        year: 2002,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1)
    })

    it("should throw 404 eeror", () =>{
      try{
        service.getOne(999);
      }catch(err){
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.message).toEqual('Movie with ID 999 not found')
      }
    })
  })


});
