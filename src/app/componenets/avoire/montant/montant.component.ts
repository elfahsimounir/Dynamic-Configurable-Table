import { Component } from '@angular/core';
import { PointOfSell } from '../../../services/point-of-sell/point-of-sell.service';

@Component({
  selector: 'app-montant',
  standalone: true,
  imports: [],
  templateUrl: './montant.component.html',
  styleUrl: './montant.component.scss'
})
export class MontantComponent {
  constructor(public selectItem: PointOfSell) { }
}
