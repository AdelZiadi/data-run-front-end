import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { WarehouseItemService } from '../service/warehouse-item.service';
import { IWarehouseItem } from '../warehouse-item.model';
import { WarehouseItemFormService } from './warehouse-item-form.service';

import { WarehouseItemUpdateComponent } from './warehouse-item-update.component';

describe('WarehouseItem Management Update Component', () => {
  let comp: WarehouseItemUpdateComponent;
  let fixture: ComponentFixture<WarehouseItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let warehouseItemFormService: WarehouseItemFormService;
  let warehouseItemService: WarehouseItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, WarehouseItemUpdateComponent],
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
      .overrideTemplate(WarehouseItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WarehouseItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    warehouseItemFormService = TestBed.inject(WarehouseItemFormService);
    warehouseItemService = TestBed.inject(WarehouseItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const warehouseItem: IWarehouseItem = { id: 456 };

      activatedRoute.data = of({ warehouseItem });
      comp.ngOnInit();

      expect(comp.warehouseItem).toEqual(warehouseItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseItem>>();
      const warehouseItem = { id: 123 };
      jest.spyOn(warehouseItemFormService, 'getWarehouseItem').mockReturnValue(warehouseItem);
      jest.spyOn(warehouseItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouseItem }));
      saveSubject.complete();

      // THEN
      expect(warehouseItemFormService.getWarehouseItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(warehouseItemService.update).toHaveBeenCalledWith(expect.objectContaining(warehouseItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseItem>>();
      const warehouseItem = { id: 123 };
      jest.spyOn(warehouseItemFormService, 'getWarehouseItem').mockReturnValue({ id: null });
      jest.spyOn(warehouseItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: warehouseItem }));
      saveSubject.complete();

      // THEN
      expect(warehouseItemFormService.getWarehouseItem).toHaveBeenCalled();
      expect(warehouseItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWarehouseItem>>();
      const warehouseItem = { id: 123 };
      jest.spyOn(warehouseItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ warehouseItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(warehouseItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
