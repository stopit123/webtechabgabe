import { Component, OnInit, WritableSignal } from '@angular/core';
import { MediumFormComponent } from '../medium-form/medium-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Medium } from '../medium';
import { MediumService } from '../medium.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-medium',
  standalone: true,
  imports: [MediumFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Medium</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-medium-form
          [initialState]="medium()"
          (formSubmitted)="editMedium($event)"
        ></app-medium-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditMediumComponent implements OnInit {
  medium = {} as WritableSignal<Medium>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediumService: MediumService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.mediumService.getMedium(id!);
    this.medium = this.mediumService.medium$;
  }

  editMedium(medium: Medium) {
    this.mediumService
      .updateMedium(this.medium()._id || '', medium)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update medium');
          console.error(error);
        },
      });
  }
}