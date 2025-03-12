import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroComponent } from '../../shared/hero/hero.component';
import { InfoPopupComponent } from '../../layout/info-popup/info-popup.component';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { AnimalArticleService } from '../../../../../ng-sheltify/src/lib/animal-article.service';

export type HomeData = {
  hero: StrapiMedia,
  castrationCount: number,
  article: ArticleSection[],
}

export const homeResolver: ResolveFn<HomeData> = () => {
  return inject(AnimalArticleService).getAndInsertAnimalLinks<HomeData>("home?populate[hero][populate]=*&populate[1]=article&populate[article][populate]=*");
}

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [ArticleComponent, HeroComponent, InfoPopupComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  homeData!: HomeData;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
    .subscribe( ({ homeData }) => {
        this.homeData = homeData;
      }
    );
  }
}
