import { Component, OnInit, ElementRef,Input,ChangeDetectorRef, ViewChild } from '@angular/core';
import {KeyboardService ,DragDropService ,PaginationService,FilterService, TableService, SelectionService } from '@TableServices'
import { ChangeDetectionStrategy } from '@angular/core';
import { AlertComponent, FilterComponent, PaginationComponent, ToolBarComponent } from '@TableComponenets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  standalone:true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports:[CommonModule,PaginationComponent,FilterComponent,AlertComponent,ToolBarComponent,FormsModule,DragDropModule],
  providers:[],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @ViewChild('myTable') tableElement!: ElementRef;
  @Input() mainDataControle: any;
  @Input() mainData: any;
  @Input() data: any;
  //services links
  tableService!: TableService;
  filterService!:FilterService;
  paginationService!:PaginationService;
  dragDropService!:DragDropService;
  keyboardService!:KeyboardService;
  selection!:SelectionService

  constructor(
    private tableService_: TableService,
    private filterservice_: FilterService,
    private paginationService_: PaginationService,
    private dragDrop_:DragDropService,
    private keybordService_:KeyboardService,
    private selectionService:SelectionService,
    private cdr: ChangeDetectorRef,
  ) {}
  
  ngOnInit() {
    this.tableService = this.tableService_;
    this.filterService = this.filterservice_;
    this.paginationService = this.paginationService_;
    this.keyboardService=this.keybordService_;
    this.dragDropService=this.dragDrop_;
    this.tableService_.getData(this.data,this.mainData,this.mainDataControle);
    this.filterservice_.filterInputHandler();
    this.filterservice_.applyFilter(this.data);
    this.filterservice_.getData(this.data);
    this.selection=this.selectionService;
  }
  idTrigger(id: number) {console.log(id)}
  ngAfterViewInit() {
    this.tableElement.nativeElement.focus(); 
    this.keybordService_.getFocusedElement(this.tableElement);
    this.cdr.detectChanges();
  }
}
