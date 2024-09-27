import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, from, Observable, of, throwError } from 'rxjs';
import { TableService } from '../table/table.service';
import { environment } from '../../../../../environments/environment';
import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';

@Injectable({
  
  providedIn: 'root'
})
export class ProductsService {
  port!:string;
  route!:string;
  private api = environment.API_URL
  private apiUrl!:string;

  constructor(private http: HttpClient,private platform: Platform) { }




  getApi(route:string){
    this.apiUrl = `${this.api}/${route?route:'products'}`
    ;
  };

  
  patchOrders(id: any, data: any): Observable<any> {
    if (!this.apiUrl) {
      console.error('API URL is not set. Call getApi() before making a request.');
      return throwError('API URL is not set. Call getApi() before making a request.');
    }
    const url = `${this.apiUrl}/${id}`;
    console.log('Making PATCH request to:', url);

    return this.http.patch<any>(url, data) // Removed the object wrapping `data`
      .pipe(
        catchError(this.handleError)
      );
  }
  getBrand(): Observable<any> {
    return this.http.get(`${this.api}/brand`);
  }


  patchBrand(data: { id: string, form: any }) {
    return this.http.patch(`${this.api}/brand/upload-image/${data.id}`, data.form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  patchBrandData(data: { id: string, form: any }): Observable<any> {
    return this.http.patch(`${this.api}/brand/${data.id}`, data.form)
      .pipe(catchError(this.handleError));
  }

//  (form: any): Observable<any> {
//     return this.http.post(`${this.api}/brand`, form)
//       .pipe(catchError(this.handleError));
//   }
  postBrand(form: any) {
    return this.http.post(`${this.api}/brand`, form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }

  deleteBrand(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.api}/brand/${id}`, { headers, responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }


  getCategory(): Observable<any> {
    return this.http.get(`${this.api}/category`);
  }
  getCategoryById(id:any): Observable<any> {
    return this.http.get(`${this.api}/category/${id}`);
  }
  getSubCategory(): Observable<any>  {
    return this.http.get(`${this.api}/category/subCat`)
  }
  postCategory(form: any) {
    return this.http.post(`${this.api}/category`, form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  postCategory2(form: any) {
    return this.http.post(`${this.api}/category`, form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  postCategorySub(form: any) {
    return this.http.post(`${this.apiUrl}/subCategory`, form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  patchCategoryData(data: { id: string, form: any }) {
    return this.http.patch(`${this.api}/category/${data.id}`, data.form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  patchCategory(data: { id: string, form: any }) {
    return this.http.patch(`${this.api}/category/upload-image/${data.id}`, data.form)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }
  postSubCategory(data: any) {
    return this.http.post(`${this.api}/category/subCategory`, data)
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }

  deleteCategory(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.api}/category/${id}`, { headers, responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      )
      .toPromise();
  }

  // createProduct(productData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, productData);
  // }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
