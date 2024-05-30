import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReviewTeam } from '../review-team.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../review-team.test-samples';

import { ReviewTeamService, RestReviewTeam } from './review-team.service';

const requireRestSample: RestReviewTeam = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  lastModifiedDate: sampleWithRequiredData.lastModifiedDate?.toJSON(),
};

describe('ReviewTeam Service', () => {
  let service: ReviewTeamService;
  let httpMock: HttpTestingController;
  let expectedResult: IReviewTeam | IReviewTeam[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReviewTeamService);
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

    it('should create a ReviewTeam', () => {
      const reviewTeam = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reviewTeam).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReviewTeam', () => {
      const reviewTeam = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reviewTeam).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReviewTeam', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReviewTeam', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReviewTeam', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReviewTeamToCollectionIfMissing', () => {
      it('should add a ReviewTeam to an empty array', () => {
        const reviewTeam: IReviewTeam = sampleWithRequiredData;
        expectedResult = service.addReviewTeamToCollectionIfMissing([], reviewTeam);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reviewTeam);
      });

      it('should not add a ReviewTeam to an array that contains it', () => {
        const reviewTeam: IReviewTeam = sampleWithRequiredData;
        const reviewTeamCollection: IReviewTeam[] = [
          {
            ...reviewTeam,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReviewTeamToCollectionIfMissing(reviewTeamCollection, reviewTeam);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReviewTeam to an array that doesn't contain it", () => {
        const reviewTeam: IReviewTeam = sampleWithRequiredData;
        const reviewTeamCollection: IReviewTeam[] = [sampleWithPartialData];
        expectedResult = service.addReviewTeamToCollectionIfMissing(reviewTeamCollection, reviewTeam);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reviewTeam);
      });

      it('should add only unique ReviewTeam to an array', () => {
        const reviewTeamArray: IReviewTeam[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reviewTeamCollection: IReviewTeam[] = [sampleWithRequiredData];
        expectedResult = service.addReviewTeamToCollectionIfMissing(reviewTeamCollection, ...reviewTeamArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reviewTeam: IReviewTeam = sampleWithRequiredData;
        const reviewTeam2: IReviewTeam = sampleWithPartialData;
        expectedResult = service.addReviewTeamToCollectionIfMissing([], reviewTeam, reviewTeam2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reviewTeam);
        expect(expectedResult).toContain(reviewTeam2);
      });

      it('should accept null and undefined values', () => {
        const reviewTeam: IReviewTeam = sampleWithRequiredData;
        expectedResult = service.addReviewTeamToCollectionIfMissing([], null, reviewTeam, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reviewTeam);
      });

      it('should return initial array if no ReviewTeam is added', () => {
        const reviewTeamCollection: IReviewTeam[] = [sampleWithRequiredData];
        expectedResult = service.addReviewTeamToCollectionIfMissing(reviewTeamCollection, undefined, null);
        expect(expectedResult).toEqual(reviewTeamCollection);
      });
    });

    describe('compareReviewTeam', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReviewTeam(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReviewTeam(entity1, entity2);
        const compareResult2 = service.compareReviewTeam(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReviewTeam(entity1, entity2);
        const compareResult2 = service.compareReviewTeam(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReviewTeam(entity1, entity2);
        const compareResult2 = service.compareReviewTeam(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
