import { Component } from '@angular/core';
import { TextEditorComponent } from '../../editor/text-editor/text-editor.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TextEditorComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
