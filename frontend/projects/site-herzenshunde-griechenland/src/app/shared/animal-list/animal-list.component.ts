import { Component, DestroyRef, Input, OnInit, inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {BehaviorSubject, debounceTime, Observable, switchMap, tap} from 'rxjs';
import { AnimalService } from '../../../../../ng-sheltify/src/lib/animal.service';
import { Animal } from '../../../../../ng-sheltify/src/types/types';
import { AnimalTileComponent } from '../../../../../ng-sheltify/src/lib/animal-tile/animal-tile.component';

@Component({
    standalone: true,
    selector: 'app-animal-list',
    imports: [AsyncPipe, AnimalTileComponent],
    templateUrl: './animal-list.component.html',
    styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent implements OnInit {
  protected animalSv = inject(AnimalService);

  @Input() query$ = new BehaviorSubject<string>("");
  @Input() isVisibleFunction?: (animal: Animal) => boolean;

  @Output() loaded = new EventEmitter<void>();

  protected animals$?: Observable<Animal[]>;

  filterAnimals(animals: Animal[]) {
    if(!this.isVisibleFunction) return animals;
    return animals.filter((animal) => this.isVisibleFunction!(animal));
  }

  ngOnInit() {
    this.animals$ = this.query$.pipe(
      debounceTime(300),
      switchMap(query => this.animalSv.getAnimalList(query).pipe(
        tap(() => this.loaded.emit())
      ))
    );
  }
}
