import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IProgressStatus } from 'app/entities/progress-status/progress-status.model';
import { ProgressStatusService } from 'app/entities/progress-status/service/progress-status.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { IItnsVillage } from '../itns-village.model';
import { ItnsVillageService } from '../service/itns-village.service';
import { ItnsVillageFormService } from './itns-village-form.service';

import { ItnsVillageUpdateComponent } from './itns-village-update.component';

describe('ItnsVillage Management Update Component', () => {
  let comp: ItnsVillageUpdateComponent;
  let fixture: ComponentFixture<ItnsVillageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itnsVillageFormService: ItnsVillageFormService;
  let itnsVillageService: ItnsVillageService;
  let progressStatusService: ProgressStatusService;
  let teamService: TeamService;
  let assignmentService: AssignmentService;
  let activityService: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ItnsVillageUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ItnsVillageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItnsVillageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itnsVillageFormService = TestBed.inject(ItnsVillageFormService);
    itnsVillageService = TestBed.inject(ItnsVillageService);
    progressStatusService = TestBed.inject(ProgressStatusService);
    teamService = TestBed.inject(TeamService);
    assignmentService = TestBed.inject(AssignmentService);
    activityService = TestBed.inject(ActivityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProgressStatus query and add missing value', () => {
      const itnsVillage: IItnsVillage = { id: 456 };
      const progressStatus: IProgressStatus = { id: 31355 };
      itnsVillage.progressStatus = progressStatus;

      const progressStatusCollection: IProgressStatus[] = [{ id: 6561 }];
      jest.spyOn(progressStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: progressStatusCollection })));
      const additionalProgressStatuses = [progressStatus];
      const expectedCollection: IProgressStatus[] = [...additionalProgressStatuses, ...progressStatusCollection];
      jest.spyOn(progressStatusService, 'addProgressStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      expect(progressStatusService.query).toHaveBeenCalled();
      expect(progressStatusService.addProgressStatusToCollectionIfMissing).toHaveBeenCalledWith(
        progressStatusCollection,
        ...additionalProgressStatuses.map(expect.objectContaining),
      );
      expect(comp.progressStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const itnsVillage: IItnsVillage = { id: 456 };
      const team: ITeam = { id: 15907 };
      itnsVillage.team = team;

      const teamCollection: ITeam[] = [{ id: 31055 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const itnsVillage: IItnsVillage = { id: 456 };
      const assignment: IAssignment = { id: 24139 };
      itnsVillage.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 7054 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Activity query and add missing value', () => {
      const itnsVillage: IItnsVillage = { id: 456 };
      const activity: IActivity = { id: 3121 };
      itnsVillage.activity = activity;

      const activityCollection: IActivity[] = [{ id: 19145 }];
      jest.spyOn(activityService, 'query').mockReturnValue(of(new HttpResponse({ body: activityCollection })));
      const additionalActivities = [activity];
      const expectedCollection: IActivity[] = [...additionalActivities, ...activityCollection];
      jest.spyOn(activityService, 'addActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      expect(activityService.query).toHaveBeenCalled();
      expect(activityService.addActivityToCollectionIfMissing).toHaveBeenCalledWith(
        activityCollection,
        ...additionalActivities.map(expect.objectContaining),
      );
      expect(comp.activitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itnsVillage: IItnsVillage = { id: 456 };
      const progressStatus: IProgressStatus = { id: 6993 };
      itnsVillage.progressStatus = progressStatus;
      const team: ITeam = { id: 21948 };
      itnsVillage.team = team;
      const assignment: IAssignment = { id: 31674 };
      itnsVillage.assignment = assignment;
      const activity: IActivity = { id: 6840 };
      itnsVillage.activity = activity;

      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      expect(comp.progressStatusesSharedCollection).toContain(progressStatus);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.activitiesSharedCollection).toContain(activity);
      expect(comp.itnsVillage).toEqual(itnsVillage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillage>>();
      const itnsVillage = { id: 123 };
      jest.spyOn(itnsVillageFormService, 'getItnsVillage').mockReturnValue(itnsVillage);
      jest.spyOn(itnsVillageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itnsVillage }));
      saveSubject.complete();

      // THEN
      expect(itnsVillageFormService.getItnsVillage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itnsVillageService.update).toHaveBeenCalledWith(expect.objectContaining(itnsVillage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillage>>();
      const itnsVillage = { id: 123 };
      jest.spyOn(itnsVillageFormService, 'getItnsVillage').mockReturnValue({ id: null });
      jest.spyOn(itnsVillageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itnsVillage }));
      saveSubject.complete();

      // THEN
      expect(itnsVillageFormService.getItnsVillage).toHaveBeenCalled();
      expect(itnsVillageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillage>>();
      const itnsVillage = { id: 123 };
      jest.spyOn(itnsVillageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itnsVillageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProgressStatus', () => {
      it('Should forward to progressStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(progressStatusService, 'compareProgressStatus');
        comp.compareProgressStatus(entity, entity2);
        expect(progressStatusService.compareProgressStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareActivity', () => {
      it('Should forward to activityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(activityService, 'compareActivity');
        comp.compareActivity(entity, entity2);
        expect(activityService.compareActivity).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
