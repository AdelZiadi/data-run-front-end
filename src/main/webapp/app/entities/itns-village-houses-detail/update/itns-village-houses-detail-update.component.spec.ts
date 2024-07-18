import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IItnsVillage } from 'app/entities/itns-village/itns-village.model';
import { ItnsVillageService } from 'app/entities/itns-village/service/itns-village.service';
import { ItnsVillageHousesDetailService } from '../service/itns-village-houses-detail.service';
import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';
import { ItnsVillageHousesDetailFormService } from './itns-village-houses-detail-form.service';

import { ItnsVillageHousesDetailUpdateComponent } from './itns-village-houses-detail-update.component';

describe('ItnsVillageHousesDetail Management Update Component', () => {
  let comp: ItnsVillageHousesDetailUpdateComponent;
  let fixture: ComponentFixture<ItnsVillageHousesDetailUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itnsVillageHousesDetailFormService: ItnsVillageHousesDetailFormService;
  let itnsVillageHousesDetailService: ItnsVillageHousesDetailService;
  let itnsVillageService: ItnsVillageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ItnsVillageHousesDetailUpdateComponent],
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
      .overrideTemplate(ItnsVillageHousesDetailUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItnsVillageHousesDetailUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itnsVillageHousesDetailFormService = TestBed.inject(ItnsVillageHousesDetailFormService);
    itnsVillageHousesDetailService = TestBed.inject(ItnsVillageHousesDetailService);
    itnsVillageService = TestBed.inject(ItnsVillageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ItnsVillage query and add missing value', () => {
      const itnsVillageHousesDetail: IItnsVillageHousesDetail = { id: 456 };
      const itnsVillage: IItnsVillage = { id: 18894 };
      itnsVillageHousesDetail.itnsVillage = itnsVillage;

      const itnsVillageCollection: IItnsVillage[] = [{ id: 10079 }];
      jest.spyOn(itnsVillageService, 'query').mockReturnValue(of(new HttpResponse({ body: itnsVillageCollection })));
      const additionalItnsVillages = [itnsVillage];
      const expectedCollection: IItnsVillage[] = [...additionalItnsVillages, ...itnsVillageCollection];
      jest.spyOn(itnsVillageService, 'addItnsVillageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itnsVillageHousesDetail });
      comp.ngOnInit();

      expect(itnsVillageService.query).toHaveBeenCalled();
      expect(itnsVillageService.addItnsVillageToCollectionIfMissing).toHaveBeenCalledWith(
        itnsVillageCollection,
        ...additionalItnsVillages.map(expect.objectContaining),
      );
      expect(comp.itnsVillagesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itnsVillageHousesDetail: IItnsVillageHousesDetail = { id: 456 };
      const itnsVillage: IItnsVillage = { id: 27940 };
      itnsVillageHousesDetail.itnsVillage = itnsVillage;

      activatedRoute.data = of({ itnsVillageHousesDetail });
      comp.ngOnInit();

      expect(comp.itnsVillagesSharedCollection).toContain(itnsVillage);
      expect(comp.itnsVillageHousesDetail).toEqual(itnsVillageHousesDetail);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillageHousesDetail>>();
      const itnsVillageHousesDetail = { id: 123 };
      jest.spyOn(itnsVillageHousesDetailFormService, 'getItnsVillageHousesDetail').mockReturnValue(itnsVillageHousesDetail);
      jest.spyOn(itnsVillageHousesDetailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillageHousesDetail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itnsVillageHousesDetail }));
      saveSubject.complete();

      // THEN
      expect(itnsVillageHousesDetailFormService.getItnsVillageHousesDetail).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itnsVillageHousesDetailService.update).toHaveBeenCalledWith(expect.objectContaining(itnsVillageHousesDetail));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillageHousesDetail>>();
      const itnsVillageHousesDetail = { id: 123 };
      jest.spyOn(itnsVillageHousesDetailFormService, 'getItnsVillageHousesDetail').mockReturnValue({ id: null });
      jest.spyOn(itnsVillageHousesDetailService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillageHousesDetail: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itnsVillageHousesDetail }));
      saveSubject.complete();

      // THEN
      expect(itnsVillageHousesDetailFormService.getItnsVillageHousesDetail).toHaveBeenCalled();
      expect(itnsVillageHousesDetailService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItnsVillageHousesDetail>>();
      const itnsVillageHousesDetail = { id: 123 };
      jest.spyOn(itnsVillageHousesDetailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itnsVillageHousesDetail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itnsVillageHousesDetailService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareItnsVillage', () => {
      it('Should forward to itnsVillageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(itnsVillageService, 'compareItnsVillage');
        comp.compareItnsVillage(entity, entity2);
        expect(itnsVillageService.compareItnsVillage).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
