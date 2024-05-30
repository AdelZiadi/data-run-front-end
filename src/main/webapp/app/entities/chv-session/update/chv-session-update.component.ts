import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { MSessionSubject } from 'app/entities/enumerations/m-session-subject.model';
import { ChvSessionService } from '../service/chv-session.service';
import { IChvSession } from '../chv-session.model';
import { ChvSessionFormService, ChvSessionFormGroup } from './chv-session-form.service';

@Component({
  standalone: true,
  selector: 'app-chv-session-update',
  templateUrl: './chv-session-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ChvSessionUpdateComponent implements OnInit {
  isSaving = false;
  chvSession: IChvSession | null = null;
  mSessionSubjectValues = Object.keys(MSessionSubject);

  teamsSharedCollection: ITeam[] = [];

  protected chvSessionService = inject(ChvSessionService);
  protected chvSessionFormService = inject(ChvSessionFormService);
  protected teamService = inject(TeamService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ChvSessionFormGroup = this.chvSessionFormService.createChvSessionFormGroup();

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chvSession }) => {
      this.chvSession = chvSession;
      if (chvSession) {
        this.updateForm(chvSession);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chvSession = this.chvSessionFormService.getChvSession(this.editForm);
    if (chvSession.id !== null) {
      this.subscribeToSaveResponse(this.chvSessionService.update(chvSession));
    } else {
      this.subscribeToSaveResponse(this.chvSessionService.create(chvSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChvSession>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(chvSession: IChvSession): void {
    this.chvSession = chvSession;
    this.chvSessionFormService.resetForm(this.editForm, chvSession);

    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, chvSession.team);
  }

  protected loadRelationshipsOptions(): void {
    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.chvSession?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));
  }
}
