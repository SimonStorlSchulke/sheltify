import { Component, inject } from '@angular/core';
import { StrapiAuthService } from '../../services/strapi-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  private strapiAuthService = inject(StrapiAuthService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  onLogin(email: string, password: string): void {
    this.strapiAuthService.login(email, password).subscribe({
      next: (response) => {
        this.toastrService.success("Logged in as " + response.data.user.email);
        this.router.navigate(["dashboard"]);
      },
      error: (err) => {
        this.toastrService.error("Login failed: " + err.message);
      },
    });
  }
}
