import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICampaignType } from 'app/entities/campaign-type/campaign-type.model';
import { CampaignTypeService } from 'app/entities/campaign-type/service/campaign-type.service';
import { CampaignService } from '../service/campaign.service';
import { ICampaign } from '../campaign.model';
import { CampaignFormService } from './campaign-form.service';

import { CampaignUpdateComponent } from './campaign-update.component';

describe('Campaign Management Update Component', () => {
  let comp: CampaignUpdateComponent;
  let fixture: ComponentFixture<CampaignUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let campaignFormService: CampaignFormService;
  let campaignService: CampaignService;
  let campaignTypeService: CampaignTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CampaignUpdateComponent],
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
      .overrideTemplate(CampaignUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CampaignUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    campaignFormService = TestBed.inject(CampaignFormService);
    campaignService = TestBed.inject(CampaignService);
    campaignTypeService = TestBed.inject(CampaignTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CampaignType query and add missing value', () => {
      const campaign: ICampaign = { id: 456 };
      const campaignType: ICampaignType = { id: 20700 };
      campaign.campaignType = campaignType;

      const campaignTypeCollection: ICampaignType[] = [{ id: 27369 }];
      jest.spyOn(campaignTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: campaignTypeCollection })));
      const additionalCampaignTypes = [campaignType];
      const expectedCollection: ICampaignType[] = [...additionalCampaignTypes, ...campaignTypeCollection];
      jest.spyOn(campaignTypeService, 'addCampaignTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ campaign });
      comp.ngOnInit();

      expect(campaignTypeService.query).toHaveBeenCalled();
      expect(campaignTypeService.addCampaignTypeToCollectionIfMissing).toHaveBeenCalledWith(
        campaignTypeCollection,
        ...additionalCampaignTypes.map(expect.objectContaining),
      );
      expect(comp.campaignTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const campaign: ICampaign = { id: 456 };
      const campaignType: ICampaignType = { id: 13996 };
      campaign.campaignType = campaignType;

      activatedRoute.data = of({ campaign });
      comp.ngOnInit();

      expect(comp.campaignTypesSharedCollection).toContain(campaignType);
      expect(comp.campaign).toEqual(campaign);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaign>>();
      const campaign = { id: 123 };
      jest.spyOn(campaignFormService, 'getCampaign').mockReturnValue(campaign);
      jest.spyOn(campaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: campaign }));
      saveSubject.complete();

      // THEN
      expect(campaignFormService.getCampaign).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(campaignService.update).toHaveBeenCalledWith(expect.objectContaining(campaign));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaign>>();
      const campaign = { id: 123 };
      jest.spyOn(campaignFormService, 'getCampaign').mockReturnValue({ id: null });
      jest.spyOn(campaignService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaign: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: campaign }));
      saveSubject.complete();

      // THEN
      expect(campaignFormService.getCampaign).toHaveBeenCalled();
      expect(campaignService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaign>>();
      const campaign = { id: 123 };
      jest.spyOn(campaignService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaign });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(campaignService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCampaignType', () => {
      it('Should forward to campaignTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(campaignTypeService, 'compareCampaignType');
        comp.compareCampaignType(entity, entity2);
        expect(campaignTypeService.compareCampaignType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
