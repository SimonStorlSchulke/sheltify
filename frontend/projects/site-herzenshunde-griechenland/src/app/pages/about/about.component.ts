import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { AnimalArticleService } from '../../../../../ng-sheltify/src/lib/animal-article.service';


export type AboutData = {
  hero: StrapiMedia,
  article: ArticleSection[],
}

export const aboutResolver: ResolveFn<AboutData> = () => {
  return inject(AnimalArticleService).getAndInsertAnimalLinks<AboutData>("about-page?populate[hero][populate]=*&populate[1]=article&populate[article][populate]=*");
}

@Component({
    standalone: true,
    selector: 'app-about',
    imports: [HeroComponent, ArticleComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
  aboutData!: AboutData;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
    .subscribe( ({ aboutData }) => {
        this.aboutData = aboutData;
      }
    );
  }
}
