import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { AnimalArticle, AnimalArticleService } from '../../../../../ng-sheltify/src/lib/animal-article.service';
import { TextSectionComponent } from '../../../../../ng-sheltify/src/lib/article/article-sections/text-section/text-section.component';
import { TextImageSectionComponent } from '../../../../../ng-sheltify/src/lib/article/article-sections/text-image-section/text-image-section.component';
import { ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { StrapiMediaPipe } from '../../../../../ng-sheltify/src/lib/strapi-image.pipe';
import { AnimalService } from '../../../../../ng-sheltify/src/lib/animal.service';
import { Animal } from '../../../../../ng-sheltify/src/types/types';


export const animalArticleResolver: ResolveFn<AnimalArticle | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const name = route.paramMap.get('name')!;  //todo null savety
  return inject(AnimalArticleService).getArticleByAnimalName(name)
  .pipe(map(data => {
    if(!data) return null;
    data.preselectedAnimalId = data.animals.findIndex(a => a.name.toLocaleLowerCase() == name.toLocaleLowerCase());
    return data;
  }));
}

@Component({
    standalone: true,
    selector: 'app-animal-article',
    templateUrl: './animal-article.component.html',
    styleUrl: './animal-article.component.scss',
    imports: [
        ArticleComponent,
        StrapiMediaPipe,
        RouterLink,
        NgIf,
    ]
})
export class AnimalArticleComponent {
  animalSv = inject(AnimalService);
  titleSv = inject(Title);

  article?: AnimalArticle;

  selectedCv: number = 0;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
      .subscribe(({ animalArticle }) => {
        if(!animalArticle) {
          inject(Router).navigate(["404"]);
          return;
        }
        this.article = animalArticle;
        this.selectedCv = this.article!.preselectedAnimalId;
        this.titleSv.setTitle(`${this.getDefaultTitle()} | Herzenshunde Griechenland e.V.`);
      });
  }

  get cAnimal() {
   return this.article!.animals[this.selectedCv]
  }

  getDefaultTitle(): string {
    if(this.article?.title) return this.article.title;
    const names = this.article?.animals.map(animal => animal.name) ?? [];
    if (names.length == 1) {
      return names[0];
    }
    if (names.length == 2) {
      return `${names[0]} & ${names[1]}`;
    }
    return names.slice(0, -1).join(", ") + ` & ${names[names.length - 1]}`;
  }

  getCtoText() {
    const names = this.article?.animals.map(animal => animal.name) ?? [];
    if (names.length == 1) {
      return `Hat ${names[0]} dein Interesse geweckt?`;
    }
    if (names.length == 2) {
      return `Haben ${names[0]} & ${names[1]} dein Interesse geweckt?`;
    }
    return `Hat einer der Hunde dein Interesse geweckt?`;
  }

  isAdult() {
    const age = this.animalSv.yearsOld(this.article!.animals[this.selectedCv]) ?? 1;
    return age > 1;
  }

  getGendericon(animal: Animal) {
    return animal.gender == "male" ? "img/male.svg" : "img/female.svg";
  }
}
