import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MediumFormComponent } from '../medium-form/medium-form.component';
import { Medium } from '../medium';
import { MediumService } from '../medium.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-medium',
  standalone: true,
  imports: [MediumFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Füge ein neues Medium hinzu</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-medium-form
          (formSubmitted)="addMedium($event)"
        ></app-medium-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddMediumComponent {
  constructor(
    private router: Router,
    private mediumService: MediumService
  ) {}

  addMedium(medium: Medium) {
    medium.format = (medium.format.charAt(0).toUpperCase() + medium.format.slice(1).toLowerCase()) as "Buch" | "Serie" | "Film";


    this.mediumService.createMedium(medium).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Oops! Es gibt wohl einen Fehler bei dem Hinzufügen eines Mediums. 😬');
        console.error(error);
      },
    });

    this.mediumService.getMedien();
  }
}
