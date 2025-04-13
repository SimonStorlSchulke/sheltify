import { Component, input, inject } from '@angular/core';
import { TextInputComponent } from '../../forms/text-input/text-input.component';
import { Animal, TempTypeAnimal } from '../../../../../sheltify-access/projects/sheltify-access/src/types/types';
import { ActivatedRoute } from '@angular/router';
import { CmsRequestService } from '../../services/cms-request.service';
import { AsyncPipe } from '@angular/common';
import { catchError, retry, of } from 'rxjs';

@Component({
    selector: 'app-animal-editor',
    imports: [
        TextInputComponent,
        AsyncPipe
    ],
    templateUrl: './animal-editor.component.html',
    styleUrl: './animal-editor.component.scss'
})
export class AnimalEditorComponent {

  private cmsRequestService = inject(CmsRequestService);

  public animal$? = this.cmsRequestService
    .getTenantsAnimal(inject(ActivatedRoute).snapshot.paramMap.get("documentId")!)
    .pipe(
      catchError(() => {
        return of(undefined);
      }));



}
