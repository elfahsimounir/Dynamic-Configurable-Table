import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-list-item.component.html',
  styleUrl: './home-list-item.component.scss'
})
export class HomeListItemComponent {
@Input() icon!:string;
@Input() title!: string;
@Input() route!: string;
}
