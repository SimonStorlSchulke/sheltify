import { Component, inject } from '@angular/core';
import { BlogArticle } from '../../blog/blog.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { StrapiService } from '../../../../../ng-sheltify/src/lib/strapi.service';

@Component({
    standalone: true,
    selector: 'app-info-popup',
    imports: [AsyncPipe, RouterLink],
    templateUrl: './info-popup.component.html',
    styleUrl: './info-popup.component.scss'
})
export class InfoPopupComponent {
  newsData$ = inject(StrapiService).get<BlogArticle[]>("blogs?filters[showAsPopup]=true&sort[1]=publishedAt:desc&populate[0]=thumbnail")
    .pipe(map(news => news.filter(n => !this.storedHiddenIds.includes(n.id))));


  hideIdsForever(newsIds: number[]) {
    localStorage.setItem("hidden-news", this.storedHiddenIds.join(",") + "," + newsIds.join(","));
  }

  getIds(news: BlogArticle[]): number[] {
    return news.map(n => n.id);
  }

  private get storedHiddenIds(): number[] {
    return (localStorage.getItem("hidden-news") ?? "").split(",") .map(id => parseInt(id));
  }
}
