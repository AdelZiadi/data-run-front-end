import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { IVillageLocation } from 'app/entities/village-location/village-location.model';
import { VillageLocationService } from 'app/entities/village-location/service/village-location.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse/service/warehouse.service';
import { IAssignment } from '../assignment.model';
import { AssignmentService } from '../service/assignment.service';
import { AssignmentFormService } from './assignment-form.service';

import { AssignmentUpdateComponent } from './assignment-update.component';

describe('Assignment Management Update Component', () => {
  let comp: AssignmentUpdateComponent;
  let fixture: ComponentFixture<AssignmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assignmentFormService: AssignmentFormService;
  let assignmentService: AssignmentService;
  let activityService: ActivityService;
  let villageLocationService: VillageLocationService;
  let teamService: TeamService;
  let warehouseService: WarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AssignmentUpdateComponent],
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
      .overrideTemplate(AssignmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssignmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assignmentFormService = TestBed.inject(AssignmentFormService);
    assignmentService = TestBed.inject(AssignmentService);
    activityService = TestBed.inject(ActivityService);
    villageLocationService = TestBed.inject(VillageLocationService);
    teamService = TestBed.inject(TeamService);
    warehouseService = TestBed.inject(WarehouseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Activity query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const activity: IActivity = { id: 28934 };
      assignment.activity = activity;

      const activityCollection: IActivity[] = [{ id: 20796 }];
      jest.spyOn(activityService, 'query').mockReturnValue(of(new HttpResponse({ body: activityCollection })));
      const additionalActivities = [activity];
      const expectedCollection: IActivity[] = [...additionalActivities, ...activityCollection];
      jest.spyOn(activityService, 'addActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(activityService.query).toHaveBeenCalled();
      expect(activityService.addActivityToCollectionIfMissing).toHaveBeenCalledWith(
        activityCollection,
        ...additionalActivities.map(expect.objectContaining),
      );
      expect(comp.activitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call VillageLocation query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const organisationUnit: IVillageLocation = { id: 8939 };
      assignment.organisationUnit = organisationUnit;

      const villageLocationCollection: IVillageLocation[] = [{ id: 9384 }];
      jest.spyOn(villageLocationService, 'query').mockReturnValue(of(new HttpResponse({ body: villageLocationCollection })));
      const additionalVillageLocations = [organisationUnit];
      const expectedCollection: IVillageLocation[] = [...additionalVillageLocations, ...villageLocationCollection];
      jest.spyOn(villageLocationService, 'addVillageLocationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(villageLocationService.query).toHaveBeenCalled();
      expect(villageLocationService.addVillageLocationToCollectionIfMissing).toHaveBeenCalledWith(
        villageLocationCollection,
        ...additionalVillageLocations.map(expect.objectContaining),
      );
      expect(comp.villageLocationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const team: ITeam = { id: 6236 };
      assignment.team = team;

      const teamCollection: ITeam[] = [{ id: 5776 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Warehouse query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const warehouse: IWarehouse = { id: 25116 };
      assignment.warehouse = warehouse;

      const warehouseCollection: IWarehouse[] = [{ id: 2750 }];
      jest.spyOn(warehouseService, 'query').mockReturnValue(of(new HttpResponse({ body: warehouseCollection })));
      const additionalWarehouses = [warehouse];
      const expectedCollection: IWarehouse[] = [...additionalWarehouses, ...warehouseCollection];
      jest.spyOn(warehouseService, 'addWarehouseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(warehouseService.query).toHaveBeenCalled();
      expect(warehouseService.addWarehouseToCollectionIfMissing).toHaveBeenCalledWith(
        warehouseCollection,
        ...additionalWarehouses.map(expect.objectContaining),
      );
      expect(comp.warehousesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assignment: IAssignment = { id: 456 };
      const activity: IActivity = { id: 7 };
      assignment.activity = activity;
      const organisationUnit: IVillageLocation = { id: 11072 };
      assignment.organisationUnit = organisationUnit;
      const team: ITeam = { id: 22052 };
      assignment.team = team;
      const warehouse: IWarehouse = { id: 24565 };
      assignment.warehouse = warehouse;

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(comp.activitiesSharedCollection).toContain(activity);
      expect(comp.villageLocationsSharedCollection).toContain(organisationUnit);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.warehousesSharedCollection).toContain(warehouse);
      expect(comp.assignment).toEqual(assignment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentFormService, 'getAssignment').mockReturnValue(assignment);
      jest.spyOn(assignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignment }));
      saveSubject.complete();

      // THEN
      expect(assignmentFormService.getAssignment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assignmentService.update).toHaveBeenCalledWith(expect.objectContaining(assignment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentFormService, 'getAssignment').mockReturnValue({ id: null });
      jest.spyOn(assignmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignment }));
      saveSubject.complete();

      // THEN
      expect(assignmentFormService.getAssignment).toHaveBeenCalled();
      expect(assignmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assignmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareActivity', () => {
      it('Should forward to activityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(activityService, 'compareActivity');
        comp.compareActivity(entity, entity2);
        expect(activityService.compareActivity).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareVillageLocation', () => {
      it('Should forward to villageLocationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(villageLocationService, 'compareVillageLocation');
        comp.compareVillageLocation(entity, entity2);
        expect(villageLocationService.compareVillageLocation).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareWarehouse', () => {
      it('Should forward to warehouseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(warehouseService, 'compareWarehouse');
        comp.compareWarehouse(entity, entity2);
        expect(warehouseService.compareWarehouse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
