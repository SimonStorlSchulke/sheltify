import { Component } from '@angular/core';
import { FormsComponent } from '../forms.component';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-sponsorship-application',
    imports: [FormsComponent, FormsModule],
    templateUrl: './sponsorship-application.component.html',
    styleUrl: './sponsorship-application.component.scss'
})
export class SponsorhipApplicationComponent {
  applicantName = "";
  animalName = "";
}
