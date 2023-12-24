import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avoire-item',
  standalone: true,
  imports: [],
  templateUrl: './avoire-item.component.html',
  styleUrl: './avoire-item.component.scss'
})
export class AvoireItemComponent {
@Input() itemQty!:number;
@Input() itemName!:string;
@Input() itemPrice!:number;
@Input() itemtotal!:number;
}
