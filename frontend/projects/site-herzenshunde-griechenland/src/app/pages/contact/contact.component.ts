import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {HeroComponent} from '../../shared/hero/hero.component';
import {ActivatedRoute, ResolveFn, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TeamMember, TeammemberTileComponent} from './teammember-tile/teammember-tile.component';
import {forkJoin} from 'rxjs';
import {MailformService} from "../../services/mailform.service";
import {HttpStatusCode} from "@angular/common/http";
import { StrapiService } from '../../../../../ng-sheltify/src/lib/strapi.service';
import { StrapiMedia } from '../../../../../ng-sheltify/src/types/types';
import { ArticleSection, ArticleComponent } from '../../../../../ng-sheltify/src/lib/article/article.component';
import { AnimalArticleService } from '../../../../../ng-sheltify/src/lib/animal-article.service';


export type ContactData = {
  pageData: {
    hero: StrapiMedia,
    article: ArticleSection[],
  },
  teamMembers: TeamMember[],
}


export const contactResolver: ResolveFn<ContactData> = () => {
  return forkJoin({
    pageData: inject(AnimalArticleService).getAndInsertAnimalLinks<{ hero: StrapiMedia, article: ArticleSection[], }>
    ("contact-page?populate[hero][populate]=*&populate[1]=article&populate[article][populate]=*"),
    teamMembers: inject(StrapiService).get<TeamMember[]>
    ("teammembers?populate=*&sort[0]=priority:desc"),
  })
}

@Component({
    standalone: true,
    selector: 'app-contact',
    imports: [HeroComponent, ArticleComponent, TeammemberTileComponent, RouterLink],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactData!: ContactData;
  mailFormSv = inject(MailformService);
  strapiSv = inject(StrapiService);

  valid = false;
  sentStatus = 0;

  draftsText = false;

  @ViewChild("message") messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild("messagerName") messagerNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild("messagerMail") messagerMailInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("acceptDsgvo") acceptDsgvoInput!: ElementRef<HTMLInputElement>;

  constructor() {
    inject(ActivatedRoute).data.pipe(takeUntilDestroyed())
      .subscribe(({contactData}) => this.contactData = contactData);
  }

  autogrow(area: HTMLTextAreaElement) {
    area.style.height = "50px";
    area.style.height = (area.scrollHeight) + "px";
    this.onInput();
  }

  async send() {
    this.sentStatus = await this.mailFormSv.send({
      subject: "Kontakformular",
      content: `<h2>Nachricht von ${this.messagerNameInput.nativeElement.value}<h2/>
<p>MailAdresse: ${this.messagerMailInput.nativeElement.value}</p>
<p>${this.messageInput.nativeElement.value}</p>
`,
    });
  }

  onInput() {
    this.valid = this.messageInput.nativeElement.value.trim() != "" &&
      this.messagerNameInput.nativeElement.value.trim() != "" &&
      this.messagerMailInput.nativeElement.checkValidity() &&
      this.messagerMailInput.nativeElement.value != "" &&
      this.acceptDsgvoInput.nativeElement.checked;

      this.secretShowDrafts();
  }

  secretShowDrafts() {
    if(this.messageInput.nativeElement.value.toLowerCase().includes("drafts zeigen bitte")) {
      this.strapiSv.enableDrafts();
    }
  }

  protected readonly HttpStatusCode = HttpStatusCode;
}
