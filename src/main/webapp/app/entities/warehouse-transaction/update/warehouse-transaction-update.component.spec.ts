import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IWarehouseItem } from 'app/entities/warehouse-item/warehouse-item.model';
import { WarehouseItemService } from 'app/entities/warehouse-item/service/warehouse-item.service';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse/service/warehouse.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { IWarehouseTransaction } from '../warehouse-transaction.model';
import { WarehouseTransactionService } from '../service/warehouse-transaction.service';
import { WarehouseTransactionFormService } from './warehouse-transaction-form.service';

import { WarehouseTransactionUpdateComponent } from './warehouse-transaction-update.component';

describe('WarehouseTransaction Management Update Component', () => {
  let comp: WarehouseTransactionUpdateComponent;
  let fixture: ComponentFixture<WarehouseTransactionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let warehouseTransactionFormService: WarehouseTransactionFormService;
  let warehouseTransactionService: WarehouseTransactionService;
  let warehouseItemService: WarehouseItemService;
  let warehouseService: WarehouseService;
  let teamService: TeamService;
  let activityService: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, WarehouseTransactionUpdateComponent],
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
      .overrideTemplate(WarehouseTransactionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WarehouseTransactionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    warehouseTransactionFormService = TestBed.inject(WarehouseTransactionFormService);
    warehouseTransactionService = TestBed.inject(WarehouseTransactionService);
    warehouseItemService = TestBed.inject(WarehouseItemService);
    warehouseService = TestBed.inject(WarehouseService);
    teamService = TestBed.inject(TeamService);
    activityService = TestBed.inject(ActivityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call WarehouseItem query and add missing value', () => {
      const warehouseTransaction: IWarehouseTransaction = { id: 456 };
      const item: IWarehouseItem = { id: 17131 };
      warehouseTransaction.item = item;

      const warehouseItemCollection: IWarehouseItem[] = [{ id: 15122 }];
      jest.spyOn(warehouseItemService, 'query').mockReturnValue(of(new HttpResponse({ body: warehouseItemCollection })));
      const additionalWarehouseItems = [item];
      const expectedCollection: IWarehouseItem[] = [...additionalWarehouseItems, ...warehouseItemCollection];
      jest.spyOn(warehouseItemService, 'addWarehouseItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      expect(warehouseItemService.query).toHaveBeenCalled();
      expect(warehouseItemService.addWarehouseItemToCollectionIfMissing).toHaveBeenCalledWith(
        warehouseItemCollection,
        ...additionalWarehouseItems.map(expect.objectContaining),
      );
      expect(comp.warehouseItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Warehouse query and add missing value', () => {
      const warehouseTransaction: IWarehouseTransaction = { id: 456 };
      const sourceWarehouse: IWarehouse = { id: 2602 };
      warehouseTransaction.sourceWarehouse = sourceWarehouse;
      const warehouse: IWarehouse = { id: 12027 };
      warehouseTransaction.warehouse = warehouse;

      const warehouseCollection: IWarehouse[] = [{ id: 1400 }];
      jest.spyOn(warehouseService, 'query').mockReturnValue(of(new HttpResponse({ body: warehouseCollection })));
      const additionalWarehouses = [sourceWarehouse, warehouse];
      const expectedCollection: IWarehouse[] = [...additionalWarehouses, ...warehouseCollection];
      jest.spyOn(warehouseService, 'addWarehouseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      expect(warehouseService.query).toHaveBeenCalled();
      expect(warehouseService.addWarehouseToCollectionIfMissing).toHaveBeenCalledWith(
        warehouseCollection,
        ...additionalWarehouses.map(expect.objectContaining),
      );
      expect(comp.warehousesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const warehouseTransaction: IWarehouseTransaction = { id: 456 };
      const team: ITeam = { id: 26982 };
      warehouseTransaction.team = team;

      const teamCollection: ITeam[] = [{ id: 18903 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Activity query and add missing value', () => {
      const warehouseTransaction: IWarehouseTransaction = { id: 456 };
      const activity: IActivity = { id: 13072 };
      warehouseTransaction.activity = activity;

      const activityCollection: IActivity[] = [{ id: 1272 }];
      jest.spyOn(activityService, 'query').mockReturnValue(of(new HttpResponse({ body: activityCollection })));
      const additionalActivities = [activity];
      const expectedCollection: IActivity[] = [...additionalActivities, ...activityCollection];
      jest.spyOn(activityService, 'addActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      expect(activityService.query).toHaveBeenCalled();
      expect(activityService.addActivityToCollectionIfMissing).toHaveBeenCalledWith(
        activityCollection,
        ...additionalActivities.map(expect.objectContaining),
      );
      expect(comp.activitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const warehouseTransaction: IWarehouseTransaction = { id: 456 };
      const item: IWarehouseItem = { id: 20849 };
      warehouseTransaction.item = item;
      const sourceWarehouse: IWarehouse = { id: 2017 };
      warehouseTransaction.sourceWarehouse = sourceWarehouse;
      const warehouse: IWarehouse = { id: 21310 };
      warehouseTransaction.warehouse = warehouse;
      const team: ITeam = { id: 8569 };
      warehouseTransaction.team = team;
      const activity: IActivity = { id: 30061 };
      warehouseTransaction.activity = activity;

      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      expect(comp.warehouseItemsSharedCollection).toContain(item);
      expect(comp.warehousesSharedCollection).toContain(sourceWarehouse);
      expect(comp.warehousesSharedCollection).toContain(warehouse);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.activitiesSharedCollection).toContain(activity);
      expect(comp.warehouseTransaction).toEqual(warehouseTransaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseTransaction>>();
      const warehouseTransaction = { id: 123 };
      jest.spyOn(warehouseTransactionFormService, 'getWarehouseTransaction').mockReturnValue(warehouseTransaction);
      jest.spyOn(warehouseTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouseTransaction }));
      saveSubject.complete();

      // THEN
      expect(warehouseTransactionFormService.getWarehouseTransaction).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(warehouseTransactionService.update).toHaveBeenCalledWith(expect.objectContaining(warehouseTransaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseTransaction>>();
      const warehouseTransaction = { id: 123 };
      jest.spyOn(warehouseTransactionFormService, 'getWarehouseTransaction').mockReturnValue({ id: null });
      jest.spyOn(warehouseTransactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseTransaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouseTransaction }));
      saveSubject.complete();

      // THEN
      expect(warehouseTransactionFormService.getWarehouseTransaction).toHaveBeenCalled();
      expect(warehouseTransactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseTransaction>>();
      const warehouseTransaction = { id: 123 };
      jest.spyOn(warehouseTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(warehouseTransactionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWarehouseItem', () => {
      it('Should forward to warehouseItemService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(warehouseItemService, 'compareWarehouseItem');
        comp.compareWarehouseItem(entity, entity2);
        expect(warehouseItemService.compareWarehouseItem).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
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
