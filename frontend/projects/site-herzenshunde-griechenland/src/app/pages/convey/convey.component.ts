import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { AnimalArticleService } from '../../../../../ng-sheltify/src/lib/animal-article.service';


export type ConveyData = {
  hero: StrapiMedia,
  article: ArticleSection[],
}

export const conveyResolver: ResolveFn<ConveyData> = () => {
  return inject(AnimalArticleService).getAndInsertAnimalLinks<ConveyData>("convey?populate[hero][populate]=*&populate[1]=article&populate[article][populate]=*");
}

@Component({
    standalone: true,
    selector: 'app-convey',
    imports: [HeroComponent, ArticleComponent],
    templateUrl: './convey.component.html',
    styleUrl: './convey.component.scss'
})
export class ConveyComponent {
  conveyData!: ConveyData;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
    .subscribe( ({ conveyData }) =>  this.conveyData = conveyData);
  }
}
