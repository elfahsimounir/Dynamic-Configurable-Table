import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeListItemComponent } from '../home-list-item/home-list-item.component';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [CommonModule,HomeListItemComponent],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.scss'
})
export class HomeListComponent {
actionsMenu=[
  {
    title:'avoire',
    icon:'../../../assets/images/avoire.webp',
    route:'/avoire'
  },
  {
    title:'expédition',
    icon:'../../../assets/images/delivered.webp',
    route:'/expedition'
  },
  {
    title:'statistique',
    icon:'../../../assets/images/statistics.webp',
    route:'/statistique'
  },
  {
    title:'soutien',
    icon:'../../../assets/images/support.webp',
    route:'/soutien'
  },

]; 

}
