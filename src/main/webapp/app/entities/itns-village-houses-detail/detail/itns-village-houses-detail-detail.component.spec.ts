import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItnsVillageHousesDetailDetailComponent } from './itns-village-houses-detail-detail.component';

describe('ItnsVillageHousesDetail Management Detail Component', () => {
  let comp: ItnsVillageHousesDetailDetailComponent;
  let fixture: ComponentFixture<ItnsVillageHousesDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItnsVillageHousesDetailDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ItnsVillageHousesDetailDetailComponent,
              resolve: { itnsVillageHousesDetail: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ItnsVillageHousesDetailDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItnsVillageHousesDetailDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load itnsVillageHousesDetail on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItnsVillageHousesDetailDetailComponent);

      // THEN
      expect(instance.itnsVillageHousesDetail()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
