import { Routes } from '@angular/router';
import { MedienListComponent } from './medien-list/medium-list.component';
import { AddMediumComponent } from './add-medium/add-medium.component'; // 
import { EditMediumComponent } from './edit-medium/edit-medium.component'; 

export const routes: Routes = [
  { path: '', component: MedienListComponent, title: 'Employees List' },
  { path: 'new', component: AddMediumComponent }, 
  { path: 'edit/:id', component: EditMediumComponent }, 
];
