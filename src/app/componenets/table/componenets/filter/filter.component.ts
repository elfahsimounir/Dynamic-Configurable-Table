import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  TableService,
  FilterService,
} from '@TableServices';
import { AngularDraggableModule } from 'angular2-draggable';

@Component({
  selector: 'app-filter',
  standalone:true,
  imports:[CommonModule,FormsModule,AngularDraggableModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() index!: number;
  @Input() item: any;
  tableService!: TableService;
  filterService!: FilterService;
  element: any;
  selectedOption: string | null = null;
  colName: string | null = null;
  show = false;
  showModal = false;

  constructor(
    private elementRef: ElementRef,
    private table_: TableService,
    private sanitizer: DomSanitizer,
    private filter_: FilterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef;
    this.tableService = this.table_;
    this.filterService = this.filter_;
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  selectOption(option: string, name: string) {
    this.selectedOption = option;
    this.colName = name;
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
