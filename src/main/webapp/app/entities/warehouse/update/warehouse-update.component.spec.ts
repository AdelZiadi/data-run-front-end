import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { WarehouseService } from '../service/warehouse.service';
import { IWarehouse } from '../warehouse.model';
import { WarehouseFormService } from './warehouse-form.service';

import { WarehouseUpdateComponent } from './warehouse-update.component';

describe('Warehouse Management Update Component', () => {
  let comp: WarehouseUpdateComponent;
  let fixture: ComponentFixture<WarehouseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let warehouseFormService: WarehouseFormService;
  let warehouseService: WarehouseService;
  let activityService: ActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, WarehouseUpdateComponent],
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
      .overrideTemplate(WarehouseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WarehouseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    warehouseFormService = TestBed.inject(WarehouseFormService);
    warehouseService = TestBed.inject(WarehouseService);
    activityService = TestBed.inject(ActivityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Activity query and add missing value', () => {
      const warehouse: IWarehouse = { id: 456 };
      const activity: IActivity = { id: 775 };
      warehouse.activity = activity;

      const activityCollection: IActivity[] = [{ id: 13843 }];
      jest.spyOn(activityService, 'query').mockReturnValue(of(new HttpResponse({ body: activityCollection })));
      const additionalActivities = [activity];
      const expectedCollection: IActivity[] = [...additionalActivities, ...activityCollection];
      jest.spyOn(activityService, 'addActivityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ warehouse });
      comp.ngOnInit();

      expect(activityService.query).toHaveBeenCalled();
      expect(activityService.addActivityToCollectionIfMissing).toHaveBeenCalledWith(
        activityCollection,
        ...additionalActivities.map(expect.objectContaining),
      );
      expect(comp.activitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const warehouse: IWarehouse = { id: 456 };
      const activity: IActivity = { id: 11193 };
      warehouse.activity = activity;

      activatedRoute.data = of({ warehouse });
      comp.ngOnInit();

      expect(comp.activitiesSharedCollection).toContain(activity);
      expect(comp.warehouse).toEqual(warehouse);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouse>>();
      const warehouse = { id: 123 };
      jest.spyOn(warehouseFormService, 'getWarehouse').mockReturnValue(warehouse);
      jest.spyOn(warehouseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouse }));
      saveSubject.complete();

      // THEN
      expect(warehouseFormService.getWarehouse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(warehouseService.update).toHaveBeenCalledWith(expect.objectContaining(warehouse));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouse>>();
      const warehouse = { id: 123 };
      jest.spyOn(warehouseFormService, 'getWarehouse').mockReturnValue({ id: null });
      jest.spyOn(warehouseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouse }));
      saveSubject.complete();

      // THEN
      expect(warehouseFormService.getWarehouse).toHaveBeenCalled();
      expect(warehouseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouse>>();
      const warehouse = { id: 123 };
      jest.spyOn(warehouseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(warehouseService.update).toHaveBeenCalled();
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
  });
});
