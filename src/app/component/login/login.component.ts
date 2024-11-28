import { UserService } from './../../services/user.service';
import { AdminService } from './../../services/admin.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertsComponent } from '../alerts/alerts.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  isResetMode: boolean = false;
  showResetOption: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required,Validators.maxLength(5)]),
      password: new FormControl('', [Validators.required,Validators.maxLength(5)]),
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }

    this.adminService.login(username, password).subscribe({
      next: (isAdminAuthenticated) => {
        if (isAdminAuthenticated) {
          this.alert('Admin login successful');
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.userService.login(username, password).subscribe({
            next: (isAuthenticated) => {
              if (isAuthenticated) {
                this.alert('Login successful');
                this.router.navigate(['/']);
              } else {
                this.userService.checkUsernameExists(username).subscribe({
                  next: (exists) => {
                    if (exists) {
                      this.errorMessage = 'Incorrect password. Would you like to reset your password?';
                      this.showResetOption = true;
                    } else {
                      this.errorMessage = 'Invalid username or password. Please try again.';
                    }
                  },
                  error: () => {
                    this.errorMessage = 'An error occurred while verifying the username.';
                  },
                });
              }
            },
            error: () => {
              this.errorMessage = 'An error occurred during login.';
            },
          });
        }
      },
      error: () => {
        this.errorMessage = 'An error occurred during admin login.';
      },
    });
  }

  startReset() {
    this.isResetMode = true;
    this.showResetOption = false;
    this.errorMessage = '';
  }

  cancelReset() {
    this.isResetMode = false;
    this.resetPasswordForm.reset();
  }

  onResetPassword() {
    const { newPassword, confirmPassword } = this.resetPasswordForm.value;
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = 'Please fill in all required fields and  password must be > 6 char.';
      return;
    }
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return;
    }
    const username = this.loginForm.get('username')?.value;
    this.userService.resetPassword(username, newPassword).subscribe({
      next: (isReset) => {
        if (isReset) {
          this.alert('Password reset successful. Please log in with your new password.');
          this.isResetMode = false;
          this.resetPasswordForm.reset();
        } else {
          this.errorMessage = 'Failed to reset password. Username may not exist.';
        }
      },
      error: () => {
        this.errorMessage = 'An error occurred while resetting your password. Please try again.';
      },
    });
  }

  alert(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px',
    });
  }

  onReset() {
    this.loginForm.reset();
    this.errorMessage = '';
    this.isResetMode = false;
    this.showResetOption = false;
  }
}
