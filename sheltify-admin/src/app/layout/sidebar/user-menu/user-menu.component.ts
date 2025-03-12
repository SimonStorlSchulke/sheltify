import { Component, inject, OnInit } from '@angular/core';
import { StrapiAuthService } from '../../../services/strapi-auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {
  strapiAuthService = inject(StrapiAuthService);

  user$ = this.strapiAuthService.user$;

  ngOnInit() {
    this.strapiAuthService.reLogin()
  }
}
