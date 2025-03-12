import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-404',
    imports: [RouterLink],
    templateUrl: './404.component.html',
    styleUrl: './404.component.scss'
})
export class NotFoundComponent {}
