import { Component, inject, OnInit } from '@angular/core';
import { StrapiRequestService } from '../../services/strapi-request.service';
import { Animal } from '../../../../../sheltify-access/projects/sheltify-access/src/types/types';
import { AsyncPipe } from '@angular/common';
import { StrapiMediaPipe } from '../../../../../sheltify-access/projects/sheltify-access/src/lib/strapi-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    AsyncPipe,
    StrapiMediaPipe,
    RouterLink,
  ],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {
  private strapiRequestService = inject(StrapiRequestService);

  $animals = this.strapiRequestService.getCollection<Animal>("animal");
}
