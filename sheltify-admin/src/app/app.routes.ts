import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnimalListComponent } from './editor/animal-list/animal-list.component';
import { AnimalEditorComponent } from './editor/animal-editor/animal-editor.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "tiere", component: AnimalListComponent},
  {path: "tiere/:documentId", component: AnimalEditorComponent},
];
