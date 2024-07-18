import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRefreshToken } from '../refresh-token.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../refresh-token.test-samples';

import { RefreshTokenService, RestRefreshToken } from './refresh-token.service';

const requireRestSample: RestRefreshToken = {
  ...sampleWithRequiredData,
  expiryDate: sampleWithRequiredData.expiryDate?.toJSON(),
};

describe('RefreshToken Service', () => {
  let service: RefreshTokenService;
  let httpMock: HttpTestingController;
  let expectedResult: IRefreshToken | IRefreshToken[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RefreshTokenService);
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

    it('should create a RefreshToken', () => {
      const refreshToken = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(refreshToken).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RefreshToken', () => {
      const refreshToken = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(refreshToken).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RefreshToken', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RefreshToken', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RefreshToken', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRefreshTokenToCollectionIfMissing', () => {
      it('should add a RefreshToken to an empty array', () => {
        const refreshToken: IRefreshToken = sampleWithRequiredData;
        expectedResult = service.addRefreshTokenToCollectionIfMissing([], refreshToken);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(refreshToken);
      });

      it('should not add a RefreshToken to an array that contains it', () => {
        const refreshToken: IRefreshToken = sampleWithRequiredData;
        const refreshTokenCollection: IRefreshToken[] = [
          {
            ...refreshToken,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRefreshTokenToCollectionIfMissing(refreshTokenCollection, refreshToken);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RefreshToken to an array that doesn't contain it", () => {
        const refreshToken: IRefreshToken = sampleWithRequiredData;
        const refreshTokenCollection: IRefreshToken[] = [sampleWithPartialData];
        expectedResult = service.addRefreshTokenToCollectionIfMissing(refreshTokenCollection, refreshToken);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(refreshToken);
      });

      it('should add only unique RefreshToken to an array', () => {
        const refreshTokenArray: IRefreshToken[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const refreshTokenCollection: IRefreshToken[] = [sampleWithRequiredData];
        expectedResult = service.addRefreshTokenToCollectionIfMissing(refreshTokenCollection, ...refreshTokenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const refreshToken: IRefreshToken = sampleWithRequiredData;
        const refreshToken2: IRefreshToken = sampleWithPartialData;
        expectedResult = service.addRefreshTokenToCollectionIfMissing([], refreshToken, refreshToken2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(refreshToken);
        expect(expectedResult).toContain(refreshToken2);
      });

      it('should accept null and undefined values', () => {
        const refreshToken: IRefreshToken = sampleWithRequiredData;
        expectedResult = service.addRefreshTokenToCollectionIfMissing([], null, refreshToken, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(refreshToken);
      });

      it('should return initial array if no RefreshToken is added', () => {
        const refreshTokenCollection: IRefreshToken[] = [sampleWithRequiredData];
        expectedResult = service.addRefreshTokenToCollectionIfMissing(refreshTokenCollection, undefined, null);
        expect(expectedResult).toEqual(refreshTokenCollection);
      });
    });

    describe('compareRefreshToken', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRefreshToken(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRefreshToken(entity1, entity2);
        const compareResult2 = service.compareRefreshToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRefreshToken(entity1, entity2);
        const compareResult2 = service.compareRefreshToken(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRefreshToken(entity1, entity2);
        const compareResult2 = service.compareRefreshToken(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
