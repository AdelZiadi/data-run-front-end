import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../campaign-type.test-samples';

import { CampaignTypeFormService } from './campaign-type-form.service';

describe('CampaignType Form Service', () => {
  let service: CampaignTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignTypeFormService);
  });

  describe('Service methods', () => {
    describe('createCampaignTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCampaignTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campaignType: expect.any(Object),
            description: expect.any(Object),
          }),
        );
      });

      it('passing ICampaignType should create a new form with FormGroup', () => {
        const formGroup = service.createCampaignTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            campaignType: expect.any(Object),
            description: expect.any(Object),
          }),
        );
      });
    });

    describe('getCampaignType', () => {
      it('should return NewCampaignType for default CampaignType initial value', () => {
        const formGroup = service.createCampaignTypeFormGroup(sampleWithNewData);

        const campaignType = service.getCampaignType(formGroup) as any;

        expect(campaignType).toMatchObject(sampleWithNewData);
      });

      it('should return NewCampaignType for empty CampaignType initial value', () => {
        const formGroup = service.createCampaignTypeFormGroup();

        const campaignType = service.getCampaignType(formGroup) as any;

        expect(campaignType).toMatchObject({});
      });

      it('should return ICampaignType', () => {
        const formGroup = service.createCampaignTypeFormGroup(sampleWithRequiredData);

        const campaignType = service.getCampaignType(formGroup) as any;

        expect(campaignType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICampaignType should not enable id FormControl', () => {
        const formGroup = service.createCampaignTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCampaignType should disable id FormControl', () => {
        const formGroup = service.createCampaignTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
