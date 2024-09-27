import { Injectable, Injector, NgZone } from '@angular/core';
import { FilterService,TableService } from '@TableServices';
@Injectable({
  providedIn: 'root',
})
export class PointOfSell {
  finalProducts: any[] = [];
  selectedItem: any;
  total!: number;
  taxes!: number;
  qte!: number;
  

  constructor(private injector: Injector,private ngZone: NgZone ) { }
  getFilteService(): FilterService {
    return this.injector.get(FilterService);
  }
  getTableService(): TableService {
    return this.injector.get(TableService);
  }
  addItem() {
    if (typeof this.selectedItem === 'object' && this.qte > 0) {
        this.finalProducts.push({ ...this.selectedItem, qte: this.qte });
        this.qte = -1;
        this.calculate();
    }
  }

  calculate() {
    this.total = this.finalProducts.reduce((total, item) => total + item.TTC * item.qte, 0).toFixed(2);
    this.taxes = this.finalProducts.reduce((taxes, item) => taxes + item.TVA * item.qte, 0).toFixed(2);
  }
  restQte() {
    this.qte = -1;
  }

  hasItem(item_: any):boolean {
  return this.finalProducts.some(item => item.name === item_.name)
  }

  submit(){
    this.addItem();
    this.updateData()
  }

  updateData(){
   let array= this.getTableService().data.map((item: any) => {
    if (item.name === this.selectedItem.name) {
      return { ...item, status: this.hasItem(this.selectedItem) };
    } else {
      return item;
    }
  });
  this.getTableService().data=array
  this.selectedItem=null;
  this.getFilteService().applyFilter(this.getTableService().data);
  }
  
  
}
