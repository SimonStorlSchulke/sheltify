import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StrapiService } from '../../../../../ng-sheltify/src/lib/strapi.service';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';


export type HelpData = {
  hero: StrapiMedia,
  article: ArticleSection[],
}

export const helpResolver: ResolveFn<HelpData> = () => {
  return inject(StrapiService).get<HelpData>("help-page?populate=*");
}

@Component({
    standalone: true,
    selector: 'app-help',
    imports: [HeroComponent, ArticleComponent],
    templateUrl: './help.component.html',
    styleUrl: './help.component.scss'
})
export class HelpComponent {
  helpData!: HelpData;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
    .subscribe( ({ helpData }) => {
        this.helpData = helpData;
      }
    );
  }
}
