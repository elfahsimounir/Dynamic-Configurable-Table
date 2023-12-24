import { Component } from '@angular/core';

@Component({
  selector: 'app-avoire-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './avoire-keyboard.component.html',
  styleUrl: './avoire-keyboard.component.scss'
})
export class AvoireKeyboardComponent {
keys:string[]=[
  '1','2','3','4','5','6','7','8','9','+/-','0','.'
]
}
