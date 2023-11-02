import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]]
  })

  public errorMessage!: string

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService
    ) {}

  public submitForm() {
    if (this.formAuth.valid) {
      this.service.login({
        email: this.formAuth.value.email,
        password: this.formAuth.value.password
      }).subscribe({
        next: (res) => res,
        error: (err) => this.errorMessage = err
      })
    } else console.error(this.formAuth.errors);

    this.formAuth.reset();
  }
}
