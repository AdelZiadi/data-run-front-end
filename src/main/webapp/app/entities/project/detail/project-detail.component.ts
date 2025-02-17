import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IProject } from '../project.model';

@Component({
  standalone: true,
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ProjectDetailComponent {
  project = input<IProject | null>(null);

  previousState(): void {
    window.history.back();
  }
}
