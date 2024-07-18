import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../assignment.test-samples';

import { AssignmentFormService } from './assignment-form.service';

describe('Assignment Form Service', () => {
  let service: AssignmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentFormService);
  });

  describe('Service methods', () => {
    describe('createAssignmentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssignmentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            phaseNo: expect.any(Object),
            districtCode: expect.any(Object),
            gov: expect.any(Object),
            district: expect.any(Object),
            subdistrict: expect.any(Object),
            village: expect.any(Object),
            subvillage: expect.any(Object),
            name: expect.any(Object),
            dayId: expect.any(Object),
            population: expect.any(Object),
            itnsPlanned: expect.any(Object),
            targetType: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            startDate: expect.any(Object),
            activity: expect.any(Object),
            organisationUnit: expect.any(Object),
            team: expect.any(Object),
            warehouse: expect.any(Object),
          }),
        );
      });

      it('passing IAssignment should create a new form with FormGroup', () => {
        const formGroup = service.createAssignmentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            phaseNo: expect.any(Object),
            districtCode: expect.any(Object),
            gov: expect.any(Object),
            district: expect.any(Object),
            subdistrict: expect.any(Object),
            village: expect.any(Object),
            subvillage: expect.any(Object),
            name: expect.any(Object),
            dayId: expect.any(Object),
            population: expect.any(Object),
            itnsPlanned: expect.any(Object),
            targetType: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            startDate: expect.any(Object),
            activity: expect.any(Object),
            organisationUnit: expect.any(Object),
            team: expect.any(Object),
            warehouse: expect.any(Object),
          }),
        );
      });
    });

    describe('getAssignment', () => {
      it('should return NewAssignment for default Assignment initial value', () => {
        const formGroup = service.createAssignmentFormGroup(sampleWithNewData);

        const assignment = service.getAssignment(formGroup) as any;

        expect(assignment).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssignment for empty Assignment initial value', () => {
        const formGroup = service.createAssignmentFormGroup();

        const assignment = service.getAssignment(formGroup) as any;

        expect(assignment).toMatchObject({});
      });

      it('should return IAssignment', () => {
        const formGroup = service.createAssignmentFormGroup(sampleWithRequiredData);

        const assignment = service.getAssignment(formGroup) as any;

        expect(assignment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssignment should not enable id FormControl', () => {
        const formGroup = service.createAssignmentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssignment should disable id FormControl', () => {
        const formGroup = service.createAssignmentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
