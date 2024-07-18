import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../team-form-access.test-samples';

import { TeamFormAccessFormService } from './team-form-access-form.service';

describe('TeamFormAccess Form Service', () => {
  let service: TeamFormAccessFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFormAccessFormService);
  });

  describe('Service methods', () => {
    describe('createTeamFormAccessFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTeamFormAccessFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            sessionDate: expect.any(Object),
            subject: expect.any(Object),
            sessions: expect.any(Object),
            people: expect.any(Object),
            comment: expect.any(Object),
            deleted: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
          }),
        );
      });

      it('passing ITeamFormAccess should create a new form with FormGroup', () => {
        const formGroup = service.createTeamFormAccessFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            sessionDate: expect.any(Object),
            subject: expect.any(Object),
            sessions: expect.any(Object),
            people: expect.any(Object),
            comment: expect.any(Object),
            deleted: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
          }),
        );
      });
    });

    describe('getTeamFormAccess', () => {
      it('should return NewTeamFormAccess for default TeamFormAccess initial value', () => {
        const formGroup = service.createTeamFormAccessFormGroup(sampleWithNewData);

        const teamFormAccess = service.getTeamFormAccess(formGroup) as any;

        expect(teamFormAccess).toMatchObject(sampleWithNewData);
      });

      it('should return NewTeamFormAccess for empty TeamFormAccess initial value', () => {
        const formGroup = service.createTeamFormAccessFormGroup();

        const teamFormAccess = service.getTeamFormAccess(formGroup) as any;

        expect(teamFormAccess).toMatchObject({});
      });

      it('should return ITeamFormAccess', () => {
        const formGroup = service.createTeamFormAccessFormGroup(sampleWithRequiredData);

        const teamFormAccess = service.getTeamFormAccess(formGroup) as any;

        expect(teamFormAccess).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITeamFormAccess should not enable id FormControl', () => {
        const formGroup = service.createTeamFormAccessFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTeamFormAccess should disable id FormControl', () => {
        const formGroup = service.createTeamFormAccessFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
