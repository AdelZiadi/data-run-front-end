import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../team.test-samples';

import { TeamFormService } from './team-form.service';

describe('Team Form Service', () => {
  let service: TeamFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFormService);
  });

  describe('Service methods', () => {
    describe('createTeamFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTeamFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            mobile: expect.any(Object),
            workers: expect.any(Object),
            mobility: expect.any(Object),
            teamType: expect.any(Object),
            disabled: expect.any(Object),
            deleteClientData: expect.any(Object),
            activity: expect.any(Object),
            operationRoom: expect.any(Object),
            warehouse: expect.any(Object),
            userInfo: expect.any(Object),
          }),
        );
      });

      it('passing ITeam should create a new form with FormGroup', () => {
        const formGroup = service.createTeamFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            mobile: expect.any(Object),
            workers: expect.any(Object),
            mobility: expect.any(Object),
            teamType: expect.any(Object),
            disabled: expect.any(Object),
            deleteClientData: expect.any(Object),
            activity: expect.any(Object),
            operationRoom: expect.any(Object),
            warehouse: expect.any(Object),
            userInfo: expect.any(Object),
          }),
        );
      });
    });

    describe('getTeam', () => {
      it('should return NewTeam for default Team initial value', () => {
        const formGroup = service.createTeamFormGroup(sampleWithNewData);

        const team = service.getTeam(formGroup) as any;

        expect(team).toMatchObject(sampleWithNewData);
      });

      it('should return NewTeam for empty Team initial value', () => {
        const formGroup = service.createTeamFormGroup();

        const team = service.getTeam(formGroup) as any;

        expect(team).toMatchObject({});
      });

      it('should return ITeam', () => {
        const formGroup = service.createTeamFormGroup(sampleWithRequiredData);

        const team = service.getTeam(formGroup) as any;

        expect(team).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITeam should not enable id FormControl', () => {
        const formGroup = service.createTeamFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTeam should disable id FormControl', () => {
        const formGroup = service.createTeamFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
