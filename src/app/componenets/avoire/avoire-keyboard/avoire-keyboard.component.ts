import { Component } from '@angular/core';
import { PointOfSell } from '../../../services/point-of-sell/point-of-sell.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avoire-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avoire-keyboard.component.html',
  styleUrl: './avoire-keyboard.component.scss'
})
export class AvoireKeyboardComponent {
keys:string[]=[
  '1','2','3','4','5','6','7','8','9','+/-','0','.'
]

selected:any;
constructor(public selectItem:PointOfSell){}

qte(number:any){
  if(number!==('+/-' || '.')){
    this.selectItem.qte=Number(number)
  }
  this.selected=number
}

}
