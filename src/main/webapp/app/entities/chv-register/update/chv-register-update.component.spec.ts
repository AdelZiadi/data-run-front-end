import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IChvRegister } from '../chv-register.model';
import { ChvRegisterService } from '../service/chv-register.service';
import { ChvRegisterFormService } from './chv-register-form.service';

import { ChvRegisterUpdateComponent } from './chv-register-update.component';

describe('ChvRegister Management Update Component', () => {
  let comp: ChvRegisterUpdateComponent;
  let fixture: ComponentFixture<ChvRegisterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chvRegisterFormService: ChvRegisterFormService;
  let chvRegisterService: ChvRegisterService;
  let assignmentService: AssignmentService;
  let activityService: ActivityService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChvRegisterUpdateComponent],
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
      .overrideTemplate(ChvRegisterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChvRegisterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chvRegisterFormService = TestBed.inject(ChvRegisterFormService);
    chvRegisterService = TestBed.inject(ChvRegisterService);
    assignmentService = TestBed.inject(AssignmentService);
    activityService = TestBed.inject(ActivityService);
    teamService = TestBed.inject(TeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Assignment query and add missing value', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const location: IAssignment = { id: 28182 };
      chvRegister.location = location;

      const assignmentCollection: IAssignment[] = [{ id: 11236 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [location];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Activity query and add missing value', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const activity: IActivity = { id: 2824 };
      chvRegister.activity = activity;

      const activityCollection: IActivity[] = [{ id: 16366 }];
      jest.spyOn(activityService, 'query').mockReturnValue(of(new HttpResponse({ body: activityCollection })));
      const additionalActivities = [activity];
      const expectedCollection: IActivity[] = [...additionalActivities, ...activityCollection];
      jest.spyOn(activityService, 'addActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(activityService.query).toHaveBeenCalled();
      expect(activityService.addActivityToCollectionIfMissing).toHaveBeenCalledWith(
        activityCollection,
        ...additionalActivities.map(expect.objectContaining),
      );
      expect(comp.activitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const team: ITeam = { id: 31578 };
      chvRegister.team = team;

      const teamCollection: ITeam[] = [{ id: 22399 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const location: IAssignment = { id: 2670 };
      chvRegister.location = location;
      const activity: IActivity = { id: 7378 };
      chvRegister.activity = activity;
      const team: ITeam = { id: 9788 };
      chvRegister.team = team;

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(comp.assignmentsSharedCollection).toContain(location);
      expect(comp.activitiesSharedCollection).toContain(activity);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.chvRegister).toEqual(chvRegister);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterFormService, 'getChvRegister').mockReturnValue(chvRegister);
      jest.spyOn(chvRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvRegister }));
      saveSubject.complete();

      // THEN
      expect(chvRegisterFormService.getChvRegister).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chvRegisterService.update).toHaveBeenCalledWith(expect.objectContaining(chvRegister));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterFormService, 'getChvRegister').mockReturnValue({ id: null });
      jest.spyOn(chvRegisterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvRegister }));
      saveSubject.complete();

      // THEN
      expect(chvRegisterFormService.getChvRegister).toHaveBeenCalled();
      expect(chvRegisterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chvRegisterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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

    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
