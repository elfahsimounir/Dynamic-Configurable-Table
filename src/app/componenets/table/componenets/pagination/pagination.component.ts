import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationService,FilterService } from '@TableServices';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  paginationService:any;
  filterService: any;
  constructor( private paginationService_: PaginationService,  private filterservice_: FilterService){}

  ngOnInit(): void {
    this.paginationService=this.paginationService_
    this.filterService=this.filterservice_
    this.paginationService_.pagesSwitch()
  }
}

