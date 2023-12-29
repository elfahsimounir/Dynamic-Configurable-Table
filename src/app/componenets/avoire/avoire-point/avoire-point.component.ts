import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvoireItemComponent,AvoireKeyboardComponent,MontantComponent  } from '@standComponenets';

@Component({
  selector: 'app-avoire-point',
  standalone: true,
  imports: [CommonModule,AvoireItemComponent,AvoireKeyboardComponent,MontantComponent],
  templateUrl: './avoire-point.component.html',
  styleUrl: './avoire-point.component.scss'
})
export class AvoirePointComponent {

}
