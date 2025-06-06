import { Component, inject } from '@angular/core';
import { ResolveFn, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { StrapiService } from '../../../../../../ng-sheltify/src/lib/strapi.service';
import { StrapiFile } from '../../../../../../ng-sheltify/src/types/types';


export const newsletterResolver: ResolveFn<NewsletterData[]> = () => {
  return inject(StrapiService).get<NewsletterData[]>("newsletters?populate=*&sort[1]=date:desc");
}


export type NewsletterData = {
  date: Date,
  file: StrapiFile,
}


@Component({
    standalone: true,
    selector: 'app-newsletter',
    imports: [
        DatePipe
    ],
    templateUrl: './newsletter.component.html',
    styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  pageData!: NewsletterData[];

  uploadsUrl  = StrapiService.uploadsBaseUrl;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
      .subscribe( ({ newsData }) => {
        console.log(newsData);
          this.pageData = newsData;
        }
      );
  }
}
