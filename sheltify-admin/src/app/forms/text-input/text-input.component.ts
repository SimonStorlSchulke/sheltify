import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  value = input<string>("");
  name = input.required<string>();
  label = input.required<string>();
  long = input<boolean>(false);
}
