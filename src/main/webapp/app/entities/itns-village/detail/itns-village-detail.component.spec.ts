import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItnsVillageDetailComponent } from './itns-village-detail.component';

describe('ItnsVillage Management Detail Component', () => {
  let comp: ItnsVillageDetailComponent;
  let fixture: ComponentFixture<ItnsVillageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItnsVillageDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ItnsVillageDetailComponent,
              resolve: { itnsVillage: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ItnsVillageDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItnsVillageDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load itnsVillage on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItnsVillageDetailComponent);

      // THEN
      expect(instance.itnsVillage()).toEqual(expect.objectContaining({ id: 123 }));
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
