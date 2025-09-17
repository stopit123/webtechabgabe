import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MedienListComponent } from './medien-list/medium-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MedienListComponent, MatToolbarModule],
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 4rem;
      }

      .gif {
        max-width: 300px;
        margin-top: 1rem;
        border-radius: 12px;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Eileen's Entertainment Liste</span>
    </mat-toolbar>

    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}