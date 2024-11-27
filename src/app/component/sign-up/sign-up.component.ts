import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports : [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group(
      {
        username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl<string>('', [Validators.required]),
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const { username, password } = this.signUpForm.value;

      this.userService.signUp(username, password).subscribe({
        next: () => {
          alert('Sign-up successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'Username already taken. Please choose another one.';
          } else {
            this.errorMessage = 'An error occurred during sign-up. Please try again later.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please ensure all fields are filled correctly.';
    }
  }

  onReset() {
    this.signUpForm.reset();
    this.errorMessage = '';
  }
}
