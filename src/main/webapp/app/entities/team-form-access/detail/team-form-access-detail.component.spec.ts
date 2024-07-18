import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TeamFormAccessDetailComponent } from './team-form-access-detail.component';

describe('TeamFormAccess Management Detail Component', () => {
  let comp: TeamFormAccessDetailComponent;
  let fixture: ComponentFixture<TeamFormAccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFormAccessDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TeamFormAccessDetailComponent,
              resolve: { teamFormAccess: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TeamFormAccessDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFormAccessDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load teamFormAccess on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TeamFormAccessDetailComponent);

      // THEN
      expect(instance.teamFormAccess()).toEqual(expect.objectContaining({ id: 123 }));
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
