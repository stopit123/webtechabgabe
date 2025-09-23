import { Component, OnInit, WritableSignal } from '@angular/core';
import { Medium } from '../medium';
import { MediumService } from '../medium.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-medien-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
       mat-card-title {
        font-size: 1.5rem;
        color: purple;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Bücher, Filme und Serien gegen Langeweile</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="medien$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-inhalt">
            <th mat-header-cell *matHeaderCellDef>Inhalt</th>
            <td mat-cell *matCellDef="let element">{{ element.inhalt }}</td>
          </ng-container>
          <ng-container matColumnDef="col-format">
            <th mat-header-cell *matHeaderCellDef>Format</th>
            <td mat-cell *matCellDef="let element">{{ element.format }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Bearbeiten
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteMedium(element._id || '')"
              >
                Löschen
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Füge ein neues Medium hinzu
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class MedienListComponent implements OnInit {
  medien$ = {} as WritableSignal<Medium[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-inhalt',
    'col-format',
    'col-action',
  ];

  constructor(private medienService: MediumService) {}

  ngOnInit() {
    this.fetchMedien();
  }

  deleteMedium(id: string): void {
    this.medienService.deleteMedium(id).subscribe({
      next: () => this.fetchMedien(),
    });
  }

  private fetchMedien(): void {
    this.medien$ = this.medienService.medien$;
    this.medienService.getMedien();
  }
}