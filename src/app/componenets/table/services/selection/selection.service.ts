import { Injectable, Injector } from '@angular/core';
import {
  FilterService,
  TableService,
} from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  arrayOfIds: any = [];
  isChecked: boolean = false;
  constructor(private injector: Injector) {}
  getTableService(): TableService {
    return this.injector.get(TableService);
  }
  getSelectionService(): SelectionService {
    return this.injector.get(SelectionService);
  }
  getFilterService(): FilterService {
    return this.injector.get(FilterService);
  }

  checkBoxHandler(id: any) {
    if (this.arrayOfIds.includes(id)) {
      this.arrayOfIds.splice(
        this.arrayOfIds.findIndex((item: number) => {
          return item === id;
        }),
        1
      );
    } else {
      this.arrayOfIds.push(id);
    }
  }
  onCheckboxChange() {
    if (this.isChecked === true && this.arrayOfIds.length > 0) {
      this.getFilterService().filterOptionHandler('only', this.arrayOfIds);
    } else if (this.isChecked === false && this.arrayOfIds.length > 0) {
      this.arrayOfIds = [];
      this.getFilterService().filterOptionHandler('only', this.arrayOfIds);
    } else if (this.isChecked===true&&this.arrayOfIds.length===0){
      this.getFilterService().filtredData.map((item:any)=>{this.arrayOfIds.push(item.id)})
    } else{
      this.arrayOfIds = [];
    }
  }
  ischeckBoxChecked(id: any) {
    return this.arrayOfIds.some((item: any) => item === id);
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
