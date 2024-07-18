import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChvSession } from '../chv-session.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../chv-session.test-samples';

import { ChvSessionService, RestChvSession } from './chv-session.service';

const requireRestSample: RestChvSession = {
  ...sampleWithRequiredData,
  sessionDate: sampleWithRequiredData.sessionDate?.toJSON(),
  startEntryTime: sampleWithRequiredData.startEntryTime?.toJSON(),
  finishedEntryTime: sampleWithRequiredData.finishedEntryTime?.toJSON(),
};

describe('ChvSession Service', () => {
  let service: ChvSessionService;
  let httpMock: HttpTestingController;
  let expectedResult: IChvSession | IChvSession[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChvSessionService);
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

    it('should create a ChvSession', () => {
      const chvSession = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chvSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChvSession', () => {
      const chvSession = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chvSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChvSession', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChvSession', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChvSession', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChvSessionToCollectionIfMissing', () => {
      it('should add a ChvSession to an empty array', () => {
        const chvSession: IChvSession = sampleWithRequiredData;
        expectedResult = service.addChvSessionToCollectionIfMissing([], chvSession);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chvSession);
      });

      it('should not add a ChvSession to an array that contains it', () => {
        const chvSession: IChvSession = sampleWithRequiredData;
        const chvSessionCollection: IChvSession[] = [
          {
            ...chvSession,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChvSessionToCollectionIfMissing(chvSessionCollection, chvSession);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChvSession to an array that doesn't contain it", () => {
        const chvSession: IChvSession = sampleWithRequiredData;
        const chvSessionCollection: IChvSession[] = [sampleWithPartialData];
        expectedResult = service.addChvSessionToCollectionIfMissing(chvSessionCollection, chvSession);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chvSession);
      });

      it('should add only unique ChvSession to an array', () => {
        const chvSessionArray: IChvSession[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chvSessionCollection: IChvSession[] = [sampleWithRequiredData];
        expectedResult = service.addChvSessionToCollectionIfMissing(chvSessionCollection, ...chvSessionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chvSession: IChvSession = sampleWithRequiredData;
        const chvSession2: IChvSession = sampleWithPartialData;
        expectedResult = service.addChvSessionToCollectionIfMissing([], chvSession, chvSession2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chvSession);
        expect(expectedResult).toContain(chvSession2);
      });

      it('should accept null and undefined values', () => {
        const chvSession: IChvSession = sampleWithRequiredData;
        expectedResult = service.addChvSessionToCollectionIfMissing([], null, chvSession, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chvSession);
      });

      it('should return initial array if no ChvSession is added', () => {
        const chvSessionCollection: IChvSession[] = [sampleWithRequiredData];
        expectedResult = service.addChvSessionToCollectionIfMissing(chvSessionCollection, undefined, null);
        expect(expectedResult).toEqual(chvSessionCollection);
      });
    });

    describe('compareChvSession', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChvSession(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChvSession(entity1, entity2);
        const compareResult2 = service.compareChvSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChvSession(entity1, entity2);
        const compareResult2 = service.compareChvSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChvSession(entity1, entity2);
        const compareResult2 = service.compareChvSession(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
