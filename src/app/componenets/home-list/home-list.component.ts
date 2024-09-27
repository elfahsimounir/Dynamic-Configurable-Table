import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeListItemComponent } from '@standComponenets';

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
    title:'Orders',
    icon:'../../../assets/images/achat.png',
    route:'/orders'
  },
  {
    title:'Products',
    icon:'../../../assets/images/files.png',
    route:'/products'
  },
  {
    title:'Categories',
    icon:'../../../assets/images/options.png',
    route:'/categories'
  },
  {
    title:'Les marques',
    icon:'../../../assets/images/brand.png',
    route:'/brands'
  },
  {
    title:'Publicity',
    icon:'../../../assets/images/pubs.png',
    route:'/pubs'
  },

]; 

}
