import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TableService } from '@TableServices';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit,AfterViewInit  {
  @Input() alert: any;
  show: boolean = false;
constructor(private table:TableService,   private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
    if (this.alert) {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }}
    ngAfterViewInit(): void {
        this.cdr.detectChanges()
    }
}
