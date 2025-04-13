import { Component, inject } from '@angular/core';
import { CmsRequestService } from '../../services/cms-request.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CmsMediaPipe } from '@sheltify-lib/cms-image.pipe';

@Component({
  selector: 'app-animal-list',
  imports: [
    AsyncPipe,
    CmsMediaPipe,
    DatePipe,
  ],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {
  private cmsRequestService = inject(CmsRequestService);
  private router = inject(Router);
  $animals = this.cmsRequestService.getTenantsAnimals();

  toAnimal(id: number) {
    this.router.navigate([`/tiere/${id}`]);
  }
}
