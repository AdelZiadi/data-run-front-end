import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChvRegister } from '../chv-register.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../chv-register.test-samples';

import { ChvRegisterService, RestChvRegister } from './chv-register.service';

const requireRestSample: RestChvRegister = {
  ...sampleWithRequiredData,
  visitDate: sampleWithRequiredData.visitDate?.toJSON(),
  startEntryTime: sampleWithRequiredData.startEntryTime?.toJSON(),
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  lastModifiedDate: sampleWithRequiredData.lastModifiedDate?.toJSON(),
};

describe('ChvRegister Service', () => {
  let service: ChvRegisterService;
  let httpMock: HttpTestingController;
  let expectedResult: IChvRegister | IChvRegister[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChvRegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ChvRegister', () => {
      const chvRegister = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chvRegister).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChvRegister', () => {
      const chvRegister = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chvRegister).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChvRegister', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChvRegister', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChvRegister', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChvRegisterToCollectionIfMissing', () => {
      it('should add a ChvRegister to an empty array', () => {
        const chvRegister: IChvRegister = sampleWithRequiredData;
        expectedResult = service.addChvRegisterToCollectionIfMissing([], chvRegister);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chvRegister);
      });

      it('should not add a ChvRegister to an array that contains it', () => {
        const chvRegister: IChvRegister = sampleWithRequiredData;
        const chvRegisterCollection: IChvRegister[] = [
          {
            ...chvRegister,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChvRegisterToCollectionIfMissing(chvRegisterCollection, chvRegister);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChvRegister to an array that doesn't contain it", () => {
        const chvRegister: IChvRegister = sampleWithRequiredData;
        const chvRegisterCollection: IChvRegister[] = [sampleWithPartialData];
        expectedResult = service.addChvRegisterToCollectionIfMissing(chvRegisterCollection, chvRegister);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chvRegister);
      });

      it('should add only unique ChvRegister to an array', () => {
        const chvRegisterArray: IChvRegister[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chvRegisterCollection: IChvRegister[] = [sampleWithRequiredData];
        expectedResult = service.addChvRegisterToCollectionIfMissing(chvRegisterCollection, ...chvRegisterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chvRegister: IChvRegister = sampleWithRequiredData;
        const chvRegister2: IChvRegister = sampleWithPartialData;
        expectedResult = service.addChvRegisterToCollectionIfMissing([], chvRegister, chvRegister2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chvRegister);
        expect(expectedResult).toContain(chvRegister2);
      });

      it('should accept null and undefined values', () => {
        const chvRegister: IChvRegister = sampleWithRequiredData;
        expectedResult = service.addChvRegisterToCollectionIfMissing([], null, chvRegister, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chvRegister);
      });

      it('should return initial array if no ChvRegister is added', () => {
        const chvRegisterCollection: IChvRegister[] = [sampleWithRequiredData];
        expectedResult = service.addChvRegisterToCollectionIfMissing(chvRegisterCollection, undefined, null);
        expect(expectedResult).toEqual(chvRegisterCollection);
      });
    });

    describe('compareChvRegister', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChvRegister(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChvRegister(entity1, entity2);
        const compareResult2 = service.compareChvRegister(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChvRegister(entity1, entity2);
        const compareResult2 = service.compareChvRegister(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChvRegister(entity1, entity2);
        const compareResult2 = service.compareChvRegister(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
