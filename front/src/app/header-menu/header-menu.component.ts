import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { LoginFormComponent } from '../login/form/form.component';

@Component({
  selector: 'HeaderMenu',
  imports: [CommonModule, ButtonModule, DialogModule, LoginFormComponent],
  templateUrl: './header-menu.component.html',
})
export class HeaderMenuComponent {
  userService = inject(UserService);
  showLoginDialog = false;

  showLogin() {
    this.showLoginDialog = true;
  }

  closeLogin() {
    this.showLoginDialog = false;
  }
}
