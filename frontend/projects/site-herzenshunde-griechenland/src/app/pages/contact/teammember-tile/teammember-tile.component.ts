import { Component, Input } from '@angular/core';
import { StrapiMediaPipe } from '../../../../../../ng-sheltify/src/lib/strapi-image.pipe';
import { StrapiMedia } from '../../../../../../ng-sheltify/src/types/types';

export type TeamMember = {
  name: string,
  role: string,
  description: string,
  mail: string,
  phone: string,
  image?: StrapiMedia,
}

@Component({
    standalone: true,
    selector: 'app-teammember-tile',
    templateUrl: './teammember-tile.component.html',
    styleUrl: './teammember-tile.component.scss',
    imports: [StrapiMediaPipe]
})
export class TeammemberTileComponent {
  @Input({required: true}) teamMember!: TeamMember;
}
