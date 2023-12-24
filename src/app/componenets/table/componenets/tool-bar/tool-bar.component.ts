import { Component, OnInit, Input, ElementRef} from '@angular/core';
import {FilterService,KeyboardService, TableService} from '@TableServices';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tool-bar',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent implements OnInit {
  @Input() tableElement!: ElementRef;
  @Input() sum: number = 0;
  @Input() key: string = '';
  //service links
  element: any;
  tableService: any;
  index = 1;
  // col controle
  colControle: boolean = true;
  keyboardService!: KeyboardService;
  filterService!: FilterService;

  lnn=this.table.mainDataControle.length
  constructor(
    private cdr: ChangeDetectorRef,
    private table:TableService,
    private filter:FilterService,
    private keyboard:KeyboardService,
  ) {}
  ngOnInit() {
    this.tableService = this.table
    this.keyboardService = this.keyboard
    this.filterService = this.filter
  }

  colHandler(arrHandler: string, item: any) {
    // const filterResult = this.tableService.mainDataControle.findIndex(
    //   (obj: any) => obj.name === item.name
    // );
    let indexToRemove = this.tableService.hiddenCols.indexOf(item.name);
    if (arrHandler === 'remove') {
      this.tableService.hiddenCols.push(item.name);
      // this.tableService.mainData.splice(filterResult, 1);
    } else {
     
      this.tableService.hiddenCols.splice(indexToRemove, 1);
      // this.tableService.mainData.push(item);
    }
    this.tableService.updateMainData();
    this.tableElement.nativeElement.focus();
  }
  savehandler(): boolean {
    return this.tableService.temporaryArray.some(
      (item: any) => item.value !== ''
    );
  }
  col_Controle() {
    this.colControle = !this.colControle;
  }
  isHidden(name: string): boolean {
    return this.tableService.hiddenCols.map((obj: any) => obj).includes(name);
  }
  pinHanlder() {
    this.tableService.pined = !this.tableService.pined;
    this.tableElement.nativeElement.focus();
  }
  keyboardHandler() {
    this.keyboardService.keyboard = !this.keyboardService.keyboard;
    // this.keyboardService.focusedRowIndex=0
    this.tableElement.nativeElement.focus();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
