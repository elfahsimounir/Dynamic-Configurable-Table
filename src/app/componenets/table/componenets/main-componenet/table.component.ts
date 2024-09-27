import { Component, OnInit, ElementRef,Input,ChangeDetectorRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import {KeyboardService ,DragDropService ,PaginationService,FilterService, TableService, SelectionService } from '@TableServices'
import { ChangeDetectionStrategy } from '@angular/core';
import { AlertComponent, FilterComponent, PaginationComponent, ToolBarComponent } from '@TableComponenets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PointOfSell } from '../../../../services/point-of-sell/point-of-sell.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-table',
  standalone:true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports:[CommonModule,PaginationComponent,FilterComponent,AlertComponent,ToolBarComponent,FormsModule,DragDropModule],
  providers:[],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit,AfterViewInit {
  @ViewChild('myTable') tableElement!: ElementRef;
  @Input() mainDataControle: any;
  @Input() mainData: any;
  @Input() data: any;
  @Input() route:any
  @Input() port:any
  @Input() isquery!:boolean
  @Output() refrechData:EventEmitter<void> = new EventEmitter<void>();
  @Output() save:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete:EventEmitter<void> = new EventEmitter<any>();
  @Output() image:EventEmitter<any> = new EventEmitter<any>();
  @Output() addP:EventEmitter<void> = new EventEmitter<void>();
  edite=false
  deletedItem:any;

  //services links
  tableService!: TableService;
  filterService!:FilterService;
  paginationService!:PaginationService;
  dragDropService!:DragDropService;
  keyboardService!:KeyboardService;
  selection!:SelectionService
  selectedAnswer!:boolean;
  visibleArray:any=[]
  api:any
  constructor(
    private tableService_: TableService,
    private filterservice_: FilterService,
    private paginationService_: PaginationService,
    private dragDrop_:DragDropService,
    private keybordService_:KeyboardService,
    private selectionService:SelectionService,
    public selectItem:PointOfSell,
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
    this.filterservice_.getData(this.data);
    this.filterservice_.applyFilter(this.data);
    this.selection=this.selectionService;
    this.cdr.detectChanges(); 
    this.api=environment.API_URL_IMAGE;
  }

  selectProduct(item:any){
    this.selectItem.selectedItem=item
  }
  onCheckboxInput($event: any, i: any) {
    const isChecked = $event.target.checked;
    this.tableService_.switch(isChecked, i);
  }
  onSelectChange($event: any, i: any){
    const value = $event.target.value;
    this.tableService_.switch(value, i);
  }
  refrech(){
    this.refrechData.emit();
  }
  saveData(){
    this.save.emit()
  }
  deleteData(item:any){
    if(confirm('Confirming the delete?')){
      this.delete.emit(item)
      this.deletedItem=item
       setTimeout(() => {
         this.deletedItem=null
       }, 1000);
    }
  }
  add(){
    this.addP.emit()
  }
  viewImage(id:any){
    this.image.emit(id)
  }
  getTruncatedText(longText: string): string {
    let max=50
    if(longText){
      return longText.length > max
      ? longText.slice(0, max) + '...'
      : longText;
    }else{
      return ''
    }

  }

  ngAfterViewInit():void {
    this.tableElement.nativeElement.focus(); 
    this.keybordService_.getFocusedElement(this.tableElement);
    this.cdr.detectChanges();
  } 
}
