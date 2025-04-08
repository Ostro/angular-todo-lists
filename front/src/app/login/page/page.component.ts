import { Component } from '@angular/core';
import { LoginFormComponent } from '../form/form.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-page',
  imports: [LoginFormComponent, CardModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class LoginPage {}
