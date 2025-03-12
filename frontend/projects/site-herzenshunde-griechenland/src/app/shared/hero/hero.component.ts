import { Component, Input } from '@angular/core';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { StrapiMediaPipe } from '../../../../../ng-sheltify/src/lib/strapi-image.pipe';

@Component({
    standalone: true,
    selector: 'app-hero',
    imports: [StrapiMediaPipe],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input({required: true}) images!: StrapiMedia[]
}
