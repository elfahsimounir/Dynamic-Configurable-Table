import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvoireItemComponent } from '../avoire-item/avoire-item.component';
import { AvoireKeyboardComponent } from '../avoire-keyboard/avoire-keyboard.component';
import { MontantComponent } from '../montant/montant.component';
import { PointOfSell } from '../../../services/point-of-sell/point-of-sell.service';

@Component({
  selector: 'app-avoire-point',
  standalone: true,
  imports: [CommonModule,AvoireItemComponent,AvoireKeyboardComponent,MontantComponent],
  templateUrl: './avoire-point.component.html',
  styleUrl: './avoire-point.component.scss'
})
export class AvoirePointComponent {

  constructor(public selectItem:PointOfSell){}

}
