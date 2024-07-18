import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../itns-village-houses-detail.test-samples';

import { ItnsVillageHousesDetailFormService } from './itns-village-houses-detail-form.service';

describe('ItnsVillageHousesDetail Form Service', () => {
  let service: ItnsVillageHousesDetailFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItnsVillageHousesDetailFormService);
  });

  describe('Service methods', () => {
    describe('createItnsVillageHousesDetailFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            couponId: expect.any(Object),
            name: expect.any(Object),
            male: expect.any(Object),
            female: expect.any(Object),
            pregnant: expect.any(Object),
            population: expect.any(Object),
            maleChild: expect.any(Object),
            femaleChild: expect.any(Object),
            displaced: expect.any(Object),
            itns: expect.any(Object),
            comment: expect.any(Object),
            submissionUuid: expect.any(Object),
            houseUuid: expect.any(Object),
            deleted: expect.any(Object),
            itnsVillage: expect.any(Object),
          }),
        );
      });

      it('passing IItnsVillageHousesDetail should create a new form with FormGroup', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            couponId: expect.any(Object),
            name: expect.any(Object),
            male: expect.any(Object),
            female: expect.any(Object),
            pregnant: expect.any(Object),
            population: expect.any(Object),
            maleChild: expect.any(Object),
            femaleChild: expect.any(Object),
            displaced: expect.any(Object),
            itns: expect.any(Object),
            comment: expect.any(Object),
            submissionUuid: expect.any(Object),
            houseUuid: expect.any(Object),
            deleted: expect.any(Object),
            itnsVillage: expect.any(Object),
          }),
        );
      });
    });

    describe('getItnsVillageHousesDetail', () => {
      it('should return NewItnsVillageHousesDetail for default ItnsVillageHousesDetail initial value', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup(sampleWithNewData);

        const itnsVillageHousesDetail = service.getItnsVillageHousesDetail(formGroup) as any;

        expect(itnsVillageHousesDetail).toMatchObject(sampleWithNewData);
      });

      it('should return NewItnsVillageHousesDetail for empty ItnsVillageHousesDetail initial value', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup();

        const itnsVillageHousesDetail = service.getItnsVillageHousesDetail(formGroup) as any;

        expect(itnsVillageHousesDetail).toMatchObject({});
      });

      it('should return IItnsVillageHousesDetail', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup(sampleWithRequiredData);

        const itnsVillageHousesDetail = service.getItnsVillageHousesDetail(formGroup) as any;

        expect(itnsVillageHousesDetail).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItnsVillageHousesDetail should not enable id FormControl', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItnsVillageHousesDetail should disable id FormControl', () => {
        const formGroup = service.createItnsVillageHousesDetailFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
