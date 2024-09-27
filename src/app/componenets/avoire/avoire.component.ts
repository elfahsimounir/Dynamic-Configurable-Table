import { ChangeDetectorRef, Component } from '@angular/core';
import { TableComponent } from '@TableComponenets';
import { FilterService, TableService } from '@TableServices';
import { ProductsService } from '../table/services/data/products.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-avoire',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './avoire.component.html',
  styleUrl: './avoire.component.scss'
})
export class AvoireComponent {
  headers: any = [
    {
      id: 1,
      name: 'Full Name',
      type: 'text',
      key: 'fullName'
    },
    
    {
      id: 2,
      name: 'Phone',
      type: 'text',
      key: 'phone'
    },
    {
      id: 3,
      name: 'City',
      type: 'text',
      key: 'city'
    },
    {
      id: 4,
      name: 'Amount',
      type: 'number',
      key: 'amount'
    },
    {
      id: 5,
      name: 'Date',
      type: 'date',
      key: 'createdAt'
    },
 
    {
      id: 6,
      name: 'Address',
      type: 'text',
      key: 'adress'
    },
    {
      id: 7,
      name: 'State',
      type: 'text',
      key: 'state'
    }
  ];
  headersControle: any = [
    {
      id: 1,
      name: 'Full Name',
      type: 'text',
      shortName: 'FN',
      key: 'fullName'
    },
    {
      id: 2,
      name: 'Phone',
      type: 'text',
      shortName: 'Ph',
      key: 'phone'
    },
    {
      id: 3,
      name: 'City',
      type: 'text',
      shortName: 'Ct',
      key: 'city'
    },
    {
      id: 4,
      name: 'Amount',
      type: 'number',
      shortName: 'Amt',
      key: 'amount'
    },
    {
      id: 5,
      name: 'Date',
      type: 'date',
      shortName: 'Date',
      key: 'createdAt'
    },
    {
      id: 6,
      name: 'Address',
      type: 'text',
      shortName: 'Addr',
      key: 'adress'
    },
    {
      id: 7,
      name: 'State',
      type: 'text',
      shortName: 'St',
      key: 'state'
    }
  ]; 
  data:any
  port='3111'
  route='orders'
 private apiUrl = `${environment.API_URL}/${this.route ? this.route : 'orders'}`
 constructor(
   private filterservice_: FilterService,
   private http: HttpClient,
   private cdr: ChangeDetectorRef,
   private productService: ProductsService,
   private table: TableService
 ) {}
 ngOnInit(): void {
 this.getData()
 this.filterservice_.restFilter()
}
getMedicalProductsN(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
getData(){
  this.getMedicalProductsN().subscribe(
    (data: any) => {
      this.data = data;

      this.filterservice_.applyFilter(this.data);
      this.table.getData(this.data,this.headers,this.headersControle);
    },
    (error) => {
      console.error('Error fetching medical products:', error);
    }
  );

  this.cdr.detectChanges();
}
saveObject() {
  this.table.update()
  this.productService.getApi(this.route)   
  this.productService.patchOrders(this.table.temporaryObj.id, this.table.convertArrayToObject(this.table.temporaryArray)).subscribe(
    (response: any) => {
      this.table.messages.push({message:'Item updated secsessfully!',type:'s'});
      setTimeout(() => {
        this.table.messages = [];
      }, 3000);
      console.log('Patch request successful:', response);
      this.getData()
    },
    (error: any) => {
      console.error('Patch request failed:', error);
      this.table.messages.push({message:'Operation failed!',type:'e'});
        setTimeout(() => {
          this.table.messages = [];
        }, 3000);
    }
  );
  if (this.data) {
    const index = this.data.findIndex(
      (obj: any) => obj.id === this.table.temporaryObj.id
    );
    this.data[index] = this.table.temporaryObj;
  }
  if (
    this.table.temporaryArray.some((item: any) => {
      return item.value !== '';
    })
  ) {
  }
  this.table.temporaryArray = [];
  this.table.temporaryObj = {};

}
ngAfterViewInit() {
 this.cdr.detectChanges();
} 
}
