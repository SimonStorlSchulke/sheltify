import { Component, Input } from '@angular/core';
import { BlogArticle } from '../blog.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StrapiMediaPipe } from '../../../../../ng-sheltify/src/lib/strapi-image.pipe';

@Component({
    standalone: true,
    selector: 'app-blog-tile',
    imports: [StrapiMediaPipe, DatePipe, RouterLink],
    templateUrl: './blog-tile.component.html',
    styleUrl: './blog-tile.component.scss'
})
export class BlogTileComponent {
  @Input({required: true}) blog!: BlogArticle;

}
