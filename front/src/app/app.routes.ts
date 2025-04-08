import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { LoginPage } from './login/page/page.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'login', component: LoginPage },
];
