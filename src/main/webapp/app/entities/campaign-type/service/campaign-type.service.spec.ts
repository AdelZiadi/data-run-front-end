import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICampaignType } from '../campaign-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../campaign-type.test-samples';

import { CampaignTypeService } from './campaign-type.service';

const requireRestSample: ICampaignType = {
  ...sampleWithRequiredData,
};

describe('CampaignType Service', () => {
  let service: CampaignTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICampaignType | ICampaignType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CampaignTypeService);
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

    it('should create a CampaignType', () => {
      const campaignType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(campaignType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CampaignType', () => {
      const campaignType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(campaignType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CampaignType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CampaignType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CampaignType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCampaignTypeToCollectionIfMissing', () => {
      it('should add a CampaignType to an empty array', () => {
        const campaignType: ICampaignType = sampleWithRequiredData;
        expectedResult = service.addCampaignTypeToCollectionIfMissing([], campaignType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(campaignType);
      });

      it('should not add a CampaignType to an array that contains it', () => {
        const campaignType: ICampaignType = sampleWithRequiredData;
        const campaignTypeCollection: ICampaignType[] = [
          {
            ...campaignType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCampaignTypeToCollectionIfMissing(campaignTypeCollection, campaignType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CampaignType to an array that doesn't contain it", () => {
        const campaignType: ICampaignType = sampleWithRequiredData;
        const campaignTypeCollection: ICampaignType[] = [sampleWithPartialData];
        expectedResult = service.addCampaignTypeToCollectionIfMissing(campaignTypeCollection, campaignType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(campaignType);
      });

      it('should add only unique CampaignType to an array', () => {
        const campaignTypeArray: ICampaignType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const campaignTypeCollection: ICampaignType[] = [sampleWithRequiredData];
        expectedResult = service.addCampaignTypeToCollectionIfMissing(campaignTypeCollection, ...campaignTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const campaignType: ICampaignType = sampleWithRequiredData;
        const campaignType2: ICampaignType = sampleWithPartialData;
        expectedResult = service.addCampaignTypeToCollectionIfMissing([], campaignType, campaignType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(campaignType);
        expect(expectedResult).toContain(campaignType2);
      });

      it('should accept null and undefined values', () => {
        const campaignType: ICampaignType = sampleWithRequiredData;
        expectedResult = service.addCampaignTypeToCollectionIfMissing([], null, campaignType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(campaignType);
      });

      it('should return initial array if no CampaignType is added', () => {
        const campaignTypeCollection: ICampaignType[] = [sampleWithRequiredData];
        expectedResult = service.addCampaignTypeToCollectionIfMissing(campaignTypeCollection, undefined, null);
        expect(expectedResult).toEqual(campaignTypeCollection);
      });
    });

    describe('compareCampaignType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCampaignType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCampaignType(entity1, entity2);
        const compareResult2 = service.compareCampaignType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCampaignType(entity1, entity2);
        const compareResult2 = service.compareCampaignType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCampaignType(entity1, entity2);
        const compareResult2 = service.compareCampaignType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
