import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MSessionSubject } from 'app/entities/enumerations/m-session-subject.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';
import { ITeamFormAccess } from '../team-form-access.model';
import { TeamFormAccessService } from '../service/team-form-access.service';
import { TeamFormAccessFormService, TeamFormAccessFormGroup } from './team-form-access-form.service';

@Component({
  standalone: true,
  selector: 'app-team-form-access-update',
  templateUrl: './team-form-access-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeamFormAccessUpdateComponent implements OnInit {
  isSaving = false;
  teamFormAccess: ITeamFormAccess | null = null;
  mSessionSubjectValues = Object.keys(MSessionSubject);
  syncableStatusValues = Object.keys(SyncableStatus);

  protected teamFormAccessService = inject(TeamFormAccessService);
  protected teamFormAccessFormService = inject(TeamFormAccessFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TeamFormAccessFormGroup = this.teamFormAccessFormService.createTeamFormAccessFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teamFormAccess }) => {
      this.teamFormAccess = teamFormAccess;
      if (teamFormAccess) {
        this.updateForm(teamFormAccess);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teamFormAccess = this.teamFormAccessFormService.getTeamFormAccess(this.editForm);
    if (teamFormAccess.id !== null) {
      this.subscribeToSaveResponse(this.teamFormAccessService.update(teamFormAccess));
    } else {
      this.subscribeToSaveResponse(this.teamFormAccessService.create(teamFormAccess));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamFormAccess>>): void {
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

  protected updateForm(teamFormAccess: ITeamFormAccess): void {
    this.teamFormAccess = teamFormAccess;
    this.teamFormAccessFormService.resetForm(this.editForm, teamFormAccess);
  }
}
