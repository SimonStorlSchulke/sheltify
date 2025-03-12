import { Component, input, inject } from '@angular/core';
import { TextInputComponent } from '../../forms/text-input/text-input.component';
import { Animal } from '../../../../../sheltify-access/projects/sheltify-access/src/types/types';
import { ActivatedRoute } from '@angular/router';
import { StrapiRequestService } from '../../services/strapi-request.service';
import { AsyncPipe } from '@angular/common';
import { catchError, retry, of } from 'rxjs';

@Component({
  selector: 'app-animal-editor',
  standalone: true,
  imports: [
    TextInputComponent,
    AsyncPipe
  ],
  templateUrl: './animal-editor.component.html',
  styleUrl: './animal-editor.component.scss'
})
export class AnimalEditorComponent {

  private strapiRequestService = inject(StrapiRequestService);

  public animal$? = this.strapiRequestService
    .getEntry<Animal>("animal", inject(ActivatedRoute).snapshot.paramMap.get("documentId")!)
    .pipe(
      catchError(() => {
        return of(undefined);
      }));



}
