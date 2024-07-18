import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../itns-village.test-samples';

import { ItnsVillageFormService } from './itns-village-form.service';

describe('ItnsVillage Form Service', () => {
  let service: ItnsVillageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItnsVillageFormService);
  });

  describe('Service methods', () => {
    describe('createItnsVillageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItnsVillageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            submissionUuid: expect.any(Object),
            submissionId: expect.any(Object),
            workDayDate: expect.any(Object),
            surveytype: expect.any(Object),
            otherReasonComment: expect.any(Object),
            reasonNotcomplete: expect.any(Object),
            settlement: expect.any(Object),
            settlementName: expect.any(Object),
            tlCommenet: expect.any(Object),
            timeSpentHours: expect.any(Object),
            timeSpentMinutes: expect.any(Object),
            difficulties: expect.any(Object),
            locationCaptured: expect.any(Object),
            locationCaptureTime: expect.any(Object),
            hoProof: expect.any(Object),
            hoProofUrl: expect.any(Object),
            submissionTime: expect.any(Object),
            untargetingOtherSpecify: expect.any(Object),
            otherVillageName: expect.any(Object),
            otherVillageCode: expect.any(Object),
            otherTeamNo: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            deleted: expect.any(Object),
            status: expect.any(Object),
            progressStatus: expect.any(Object),
            team: expect.any(Object),
            assignment: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });

      it('passing IItnsVillage should create a new form with FormGroup', () => {
        const formGroup = service.createItnsVillageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            submissionUuid: expect.any(Object),
            submissionId: expect.any(Object),
            workDayDate: expect.any(Object),
            surveytype: expect.any(Object),
            otherReasonComment: expect.any(Object),
            reasonNotcomplete: expect.any(Object),
            settlement: expect.any(Object),
            settlementName: expect.any(Object),
            tlCommenet: expect.any(Object),
            timeSpentHours: expect.any(Object),
            timeSpentMinutes: expect.any(Object),
            difficulties: expect.any(Object),
            locationCaptured: expect.any(Object),
            locationCaptureTime: expect.any(Object),
            hoProof: expect.any(Object),
            hoProofUrl: expect.any(Object),
            submissionTime: expect.any(Object),
            untargetingOtherSpecify: expect.any(Object),
            otherVillageName: expect.any(Object),
            otherVillageCode: expect.any(Object),
            otherTeamNo: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            deleted: expect.any(Object),
            status: expect.any(Object),
            progressStatus: expect.any(Object),
            team: expect.any(Object),
            assignment: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });
    });

    describe('getItnsVillage', () => {
      it('should return NewItnsVillage for default ItnsVillage initial value', () => {
        const formGroup = service.createItnsVillageFormGroup(sampleWithNewData);

        const itnsVillage = service.getItnsVillage(formGroup) as any;

        expect(itnsVillage).toMatchObject(sampleWithNewData);
      });

      it('should return NewItnsVillage for empty ItnsVillage initial value', () => {
        const formGroup = service.createItnsVillageFormGroup();

        const itnsVillage = service.getItnsVillage(formGroup) as any;

        expect(itnsVillage).toMatchObject({});
      });

      it('should return IItnsVillage', () => {
        const formGroup = service.createItnsVillageFormGroup(sampleWithRequiredData);

        const itnsVillage = service.getItnsVillage(formGroup) as any;

        expect(itnsVillage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItnsVillage should not enable id FormControl', () => {
        const formGroup = service.createItnsVillageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItnsVillage should disable id FormControl', () => {
        const formGroup = service.createItnsVillageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
