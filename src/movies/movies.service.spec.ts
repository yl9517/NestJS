import { ConsoleLogger, NotFoundException } from '@nestjs/common';
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
    })

    it("should throw 404 eeror", () =>{
      try{
        service.getOne(999);
      }catch(err){
        expect(err).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe("deleteOne", () => {
    it("deletes a movie", () =>{
      service.createOne({
        title: "Test movie",
        genres:['test'],
        year: 2002,
      });
      const beforeDelete =service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })

    it("should throw 404 error", () =>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () =>{
      const beforeCreate = service.getAll().length;
      service.createOne({
        title: "new create movie",
        genres:['test1'],
        year: 2022,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate,afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe("update test", () => {
    it("should update a movie", () =>{
      service.createOne({
        title: "new create movie",
        genres:['test1'],
        year: 2022,
      });

      service.updateOne(1, {title:"update Test"});
      const movie = service.getOne(1);

      expect(movie.title).toEqual("update Test")
    })

    it("should throw a NotFoundException", () =>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

});
