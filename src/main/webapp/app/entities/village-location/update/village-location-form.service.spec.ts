import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../village-location.test-samples';

import { VillageLocationFormService } from './village-location-form.service';

describe('VillageLocation Form Service', () => {
  let service: VillageLocationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillageLocationFormService);
  });

  describe('Service methods', () => {
    describe('createVillageLocationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVillageLocationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            mappingStatus: expect.any(Object),
            districtCode: expect.any(Object),
            villageUid: expect.any(Object),
            subdistrictName: expect.any(Object),
            villageName: expect.any(Object),
            subvillageName: expect.any(Object),
            urbanRuralId: expect.any(Object),
            urbanRural: expect.any(Object),
            settlement: expect.any(Object),
            pop2004: expect.any(Object),
            pop2022: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            ppcCodeGis: expect.any(Object),
            level: expect.any(Object),
          }),
        );
      });

      it('passing IVillageLocation should create a new form with FormGroup', () => {
        const formGroup = service.createVillageLocationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            mappingStatus: expect.any(Object),
            districtCode: expect.any(Object),
            villageUid: expect.any(Object),
            subdistrictName: expect.any(Object),
            villageName: expect.any(Object),
            subvillageName: expect.any(Object),
            urbanRuralId: expect.any(Object),
            urbanRural: expect.any(Object),
            settlement: expect.any(Object),
            pop2004: expect.any(Object),
            pop2022: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            ppcCodeGis: expect.any(Object),
            level: expect.any(Object),
          }),
        );
      });
    });

    describe('getVillageLocation', () => {
      it('should return NewVillageLocation for default VillageLocation initial value', () => {
        const formGroup = service.createVillageLocationFormGroup(sampleWithNewData);

        const villageLocation = service.getVillageLocation(formGroup) as any;

        expect(villageLocation).toMatchObject(sampleWithNewData);
      });

      it('should return NewVillageLocation for empty VillageLocation initial value', () => {
        const formGroup = service.createVillageLocationFormGroup();

        const villageLocation = service.getVillageLocation(formGroup) as any;

        expect(villageLocation).toMatchObject({});
      });

      it('should return IVillageLocation', () => {
        const formGroup = service.createVillageLocationFormGroup(sampleWithRequiredData);

        const villageLocation = service.getVillageLocation(formGroup) as any;

        expect(villageLocation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVillageLocation should not enable id FormControl', () => {
        const formGroup = service.createVillageLocationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVillageLocation should disable id FormControl', () => {
        const formGroup = service.createVillageLocationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
