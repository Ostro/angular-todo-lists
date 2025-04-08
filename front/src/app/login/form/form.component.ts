import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'LoginForm',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    PasswordModule,
    InputTextModule,
    CardModule,
  ],
  templateUrl: './form.component.html',
})
export class LoginFormComponent {
  private userService = inject(UserService);
  onSuccess = output();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(event: Event) {
    event.preventDefault();
    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      //TODO: Validation error
      return;
    }
    this.userService.login(email, password, () => {
      this.onSuccess.emit();
    });
  }
}
