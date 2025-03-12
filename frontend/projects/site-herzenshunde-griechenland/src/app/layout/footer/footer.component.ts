import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { switchMap } from "rxjs";
import { RouterLink } from "@angular/router";
import { IconComponent } from "../../shared/icon/icon.component";
import { StrapiService } from '../../../../../ng-sheltify/src/lib/strapi.service';
import { StrapiMediaPipe } from '../../../../../ng-sheltify/src/lib/strapi-image.pipe';
import { ArticleComponent, ArticleSection } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { PaypalButtonSectionComponent } from '../../../../../ng-sheltify/src/lib/article/article-sections/paypal-button-section/paypal-button-section.component';

type FooterDataBannerData = {
  documentId: string;
  background: StrapiMedia;
  article: ArticleSection[];
};

@Component({
    standalone: true,
    selector: "app-footer",
    imports: [AsyncPipe, ArticleComponent, RouterLink, StrapiMediaPipe, IconComponent, PaypalButtonSectionComponent],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss"
})
export class FooterComponent {
  strapiSv = inject(StrapiService);

  footerData$ = this.strapiSv.get<FooterDataBannerData[]>("footer-banners").pipe(
    switchMap((footers) => {
      const footerIds = footers.map((footerData) => footerData.documentId);
      let randomId = footerIds[Math.floor(Math.random() * footerIds.length)];
      return this.strapiSv.get<FooterDataBannerData>(`footer-banners/${randomId}?populate=*`);
    }),
  );
}
