import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { StrapiMedia } from '../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../ng-sheltify/src/lib/article/article.component';
import { AnimalArticleService } from '../../../../ng-sheltify/src/lib/animal-article.service';

export type BlogArticle = {
  id: number,
  title: string,
  type: string,
  thumbnail?: StrapiMedia,
  description: string,
  artikel: ArticleSection[], //todo rename in strapi
  publishedAt: string,
  showAsPopup?: boolean,
}

export const blogArticleResolver: ResolveFn<BlogArticle> = (
  route: ActivatedRouteSnapshot,
) => {
  const id = route.paramMap.get('id')!;  //todo null savety
  return inject(AnimalArticleService).getBlogArticle(+id);
}

@Component({
  standalone: true,
  selector: 'app-blog',
  imports: [ArticleComponent, RouterLink, DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {

  article?: BlogArticle;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
      .subscribe(({articleData}) => {
          this.article = articleData;
        }
      );
  }
}
