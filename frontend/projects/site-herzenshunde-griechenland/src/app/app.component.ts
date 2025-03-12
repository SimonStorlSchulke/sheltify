import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from './layout/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';
import { LightboxComponent } from '../../../ng-sheltify/src/lib/lightbox/lightbox.component';
import { AnimalService } from '../../../ng-sheltify/src/lib/animal.service';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, LightboxComponent]
})
export class AppComponent implements OnInit {
  title = 'sheltify-frontend';

  router = inject(Router);
  titleSv = inject(Title);
  contexts = inject(ChildrenOutletContexts);
  animalSv = inject(AnimalService);

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if(title == "dynamic") {
          return;
        }
        if (title) {
          this.titleSv.setTitle(`${title} | Herzenshunde Griechenland e.V.`);
        } else {
          this.titleSv.setTitle("Herzenshunde Griechenland e.V.");
        }
      });

      this.animalSv.updateAllAnimalsData();
  }
}
