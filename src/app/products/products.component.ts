import {AfterViewInit, ChangeDetectorRef, Component, OnInit,inject  } from '@angular/core';
import { TableComponent } from '@TableComponenets';
import { ProductsService } from '../componenets/table/services/data/products.service';
import { FilterService, TableService } from '@TableServices';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableComponent, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,AfterViewInit {
  headers: any[] = [
    { id: 1, name: 'Images', type: 'image', key: 'image' },
    { id: 2, name: 'Title', type: 'text', key: 'title' },
    { id: 3, name: 'Description', type: 'text', key: 'description' },
    { id: 4, name: 'Price', type: 'number', key: 'price' },
    { id: 5, name: 'Discount', type: 'number', key: 'discount' },
    { id: 6, name: 'Stock', type: 'number', key: 'stock' },
    { id: 7, name: 'New', type: 'boolean', key: 'new' },
    { id: 8, name: 'Promotion', type: 'boolean', key: 'promotion' },
    { id: 9, name: 'Code', type: 'text', key: 'winCode' },
    { id: 10, name: 'Publicity', type: 'boolean', key: 'pub' },
    { id: 11, name: 'category', type: 'text', render: 'select', key: 'cateName', data: 'cateSelect' },
    { id: 12, name: 'brand', type: 'text', render: 'select', key: `brandTitle`, data: 'brandSelect' },
  ];
  headersControle: any[] = [
    { id: 1, name: 'Images', type: 'image', shortName: 'IMG', key: 'image' },
    { id: 2, name: 'Title', type: 'text', shortName: 'Title', key: 'title' },
    { id: 3, name: 'Description', type: 'text', shortName: 'Desc', key: 'description' },
    { id: 4, name: 'Price', type: 'number', shortName: 'Price', key: 'price' },
    { id: 5, name: 'Discount', type: 'number', shortName: 'Disc', key: 'discount' },
    { id: 6, name: 'Stock', type: 'number', shortName: 'Stock', key: 'stock' },
    { id: 7, name: 'New', type: 'boolean', shortName: 'New', key: 'new' },
    { id: 8, name: 'Promotion', type: 'boolean', shortName: 'Promo', key: 'promotion' },
    { id: 9, name: 'Code', type: 'text', shortName: 'WC', key: 'winCode' },
    { id: 10, name: 'Publicity', type: 'boolean', shortName: 'Pub', key: 'pub' },
    { id: 11, name: 'category', type: 'text', render: 'select', shortName: 'CM', key: 'cateName', data: 'cateSelect' },
    { id: 12, name: 'brand', type: 'text', render: 'select', shortName: 'br', key: `brandTitle`, data: 'brandSelect' },
  ];

  data!: any[]
  port = '3111'
  route = 'products'
  dataBrand: any = [];
  dataCategory: any = []
  rating = [
    { id: 1, value: '1', name: 'very poor' },
    { id: 2, value: '2', name: 'poor' },
    { id: 3, value: '3', name: 'medium' },
    { id: 4, value: '4', name: 'high' },
    { id: 5, value: '5', name: 'max' }
  ];
  showModal: any = false;
  selectedProduct: any;
  proLoading = false
  private apiUrl = `${environment.API_URL}/${this.route ? this.route : 'products'}`
  imageApi = `${environment.API_URL_IMAGE}`
  selectedFile: any;
  promotionFile: any;
  pubFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  promotionPreview: string | ArrayBuffer | null = null;
  pubPreview: string | ArrayBuffer | null = null;

  constructor(
    private filterservice_: FilterService,
    private productService: ProductsService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private table: TableService
  ) {
  
   }
  ngOnInit(): void {
    this.refrech()
    this.filterservice_.restFilter()
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  getMedicalProducts(query: { [key: string]: any }): Observable<any[]> {
    let params = new HttpParams();
    for (const key in query) {
      if (query.hasOwnProperty(key) && query[key] !== null && query[key] !== undefined) {
        params = params.append(key, query[key]);
      }
    }
    return this.http.get<any[]>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }
  refactorProducts(products: any[]) {
    return products.map((product: any, indx) => {
      let cateName = '';
      let brand = ''
      if (product.category && product.category.title) {
        if (product.category) {
          cateName = `${product.category.category.title} > ${product.category.title}`;
        }
      }
      if (product.brand && product.category.title) {
        brand = `${product.brand.title}`;
      }
      if (product.images && product.images.length > 0) {
        const firstImageUrl = product.images[0].imageURL;
        return { ...product, image: firstImageUrl, cateName: cateName, brandSelect: this.dataBrand, cateSelect: this.dataCategory, brandTitle: brand, id: indx };
      } else {
        return { ...product, cateName: cateName, brandSelect: this.dataBrand, cateSelect: this.dataCategory, brandTitle: brand, id: indx };
      }
    });
  }

  refrech() {
    this.getBrands()
    this.getCategories()
    // this.filterservice_.applyFilter(this.data);
    // this.productService.getProducts({ page: 1 }).subscribe((data:any) => {
    //   console.log(data)
    //   this.data = data?.products;
    //   this.data = this.refactorProducts(this.data)
    //   if (this.selectedProduct) {
    //     this.selectedProduct = this.data[this.selectedProduct.id]
    //   }
    //   this.filterservice_.applyFilter(this.data);
    //   this.table.getData(this.data, this.headers, this.headersControle);
    //  });
    this.getMedicalProducts({ page: 1 }).subscribe(
      (data: any) => {
        this.data = data?.products;
        // console.log(data)
        this.data = this.refactorProducts(this.data)
        if (this.selectedProduct) {
          this.selectedProduct = this.data[this.selectedProduct.id]
        }
        this.filterservice_.applyFilter(this.data);
        this.table.getData(this.data, this.headers, this.headersControle);
      },
      (error) => {
        console.error('Error fetching  products:', error);
      }
    );
    this.cdr.detectChanges();
  }

  formatKeys(obj: any) {
    const formattedObj: any = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (key) {
          case 'cateName':
            formattedObj['categoryId'] = Number(obj[key]);
            break;
          case 'brand[\'title\']':
            formattedObj['brandId'] = Number(obj[key]);
            break;
          default:
            formattedObj[key] = obj[key];
        }
      }
    }
    return formattedObj;
  }

  saveObject() {
    this.table.update()
    this.productService.getApi(this.route)
    let object: any = this.table.convertArrayToObject(this.table.temporaryArray)
    let formData = this.formatKeys(object)
    this.productService.patchOrders(this.table.temporaryObj.productRef, formData).subscribe(
      (response: any) => {
        console.log('Patch request successful:', response);

        this.refrech()
        this.table.messages.push({ message: 'Item updated secsessfully!', type: 's' });
        setTimeout(() => {
          this.table.messages = [];
        }, 3000);
      },
      (error: any) => {
        console.error('Patch request failed:', error);
        this.table.messages.push({ message: 'Operation failed!', type: 'e' });
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
    this.refrech()
  }

  delete(item: any) {

    if (item) {
      const apiUrl = `${environment.API_URL}/products/${item.productRef}`;
      this.http.delete(apiUrl)
        .subscribe(
          (response: any) => {
            console.log('Product deleted successfully:', response);
            this.table.messages.push({ message: 'Item deleted secsessfully!', type: 's' });
            setTimeout(() => {
              this.table.messages = [];
            }, 3000);
            this.refrech();
          },
          (error: any) => {
            console.error('Error deleting product:', error);
            this.table.messages.push({ message: 'Operation failed!', type: 'e' });
            setTimeout(() => {
              this.table.messages = [];
            }, 3000);
          }
        );
    }
  }

deleteImage(item: any) {
  if (item && this.selectedProduct && confirm('Confirm deleting image?')) {
    const apiUrl = `${environment.API_URL}/products/images/${item.id}`;
    
    this.http.delete(apiUrl).subscribe(
      (response: any) => {
        this.table.messages.push({ message: 'Image deleted secsessfully!', type: 's' });
        this.refrech();
      },
      (error: any) => {
        this.table.messages.push({ message: 'Operation failed!', type: 's' });
        console.error('Error deleting image:', error);
      }
    );
  }
}



  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'image') {
        this.selectedFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      } else if (type === 'pub') {
        this.pubFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.pubPreview = reader.result;
        };
        reader.readAsDataURL(this.pubFile);
      } else {
        this.promotionFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.promotionPreview = reader.result;
        };
        reader.readAsDataURL(this.promotionFile);
      }
    }
  }

  async onUpload(type: string): Promise<void> {
    if (type === 'image' && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('isDefault', 'true');
      formData.append('productId', this.selectedProduct.productRef);
      try {
        const response = await this.postProductImage(formData).toPromise();
        this.selectedFile = null;
        this.imagePreview = null

      } catch (error) {
        console.error('Error uploading image', error);
      }
    } else {
      const formData = new FormData();
      if (type === 'pub') {
        formData.append('pubURL', '1');
        formData.append('file', this.pubFile);
        this.pubFile = null
        this.pubPreview = null
      } else {
        formData.append('promotionURL', '1');
        formData.append('file', this.promotionFile);
        this.promotionFile = null
        this.promotionPreview = null
      }
      const dataForm = {
        form: formData,
        id: this.selectedProduct?.productRef,
      };
      this.patchProductImage(dataForm).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.status === 200 || res.status === 201) {
            this.refrech()
          } else {
            console.log(res)
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  postProductImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-image`, formData)
      .pipe(
        tap((response: any) =>{ 
          console.log('Response:', response)
          this.refrech()
        }),  // Log the response
        catchError(error => {
          console.error('Error:', error);  // Log the error
          return throwError(() => new Error('Failed to upload image'));  // Throw an error to the subscriber
        })
      );
  }
  patchProductImage(data: { form: FormData; id: string }): Observable<HttpResponse<any>> {
    return this.http
      .patch<any>(`${this.apiUrl}/upload-banner/${data.id}`, data.form, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }
  imageView(id: number) {
    this.selectedProduct = id;
    console.log(id)
  }

  getBrands() {
    this.productService.getBrand().subscribe(
      (response) => {
        this.dataBrand = response.map((itm: any) => {
          return {
            id: itm.id,
            name: itm.title,
            value: itm.title,
          };
        })
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );
  }

  getCategories() {
    this.productService.getCategory().subscribe(
      (response) => {
        const array: any = [];
        // let a = array.map((item)=>{return item})
        if (response) {
          response?.categories
            .filter((itm: any) => itm.parentId !== null)
            .map((itm: any) => {
              itm.subCategories.map((item: any) => {

                array.push({
                  id: item.id,
                  value:
                    itm.parentCategory?.title +
                    " > " +
                    itm.title +
                    " > " +
                    item.title,
                  name:
                    itm.parentCategory?.title +
                    " > " +
                    itm.title +
                    " > " +
                    item.title,
                });
              });
            })
          this.dataCategory = array
        }
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onProductSubmit({ formData, selectedImage }: any) {
    this.proLoading = !this.proLoading
    const discount = ((formData.price - formData.discount) * 100) / formData.price;
    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      discount: Number(discount.toFixed(0)),
      stock: Number(formData.stock),
      new: formData.new,
      pub: formData.pub,
      winCode: formData.winCode,
      brandId: Number(formData.brand),
      categoryId: Number(formData.category),
      promotion: formData.promotion,
      priority: 2,
      sale: formData.sale
    };

    this.postProduct(productData).subscribe({
      next: (response) => {
        if (response) {
          this.table.messages.push({ message: 'Product added successfully', type: 's' });
          console.log('Product posted successfully', response);
          this.uploadImage(selectedImage, response.productId);
          this.proLoading = !this.proLoading
          this.refrech()
        }
      },
      error: (error) => {
        this.proLoading = !this.proLoading
        this.table.messages.push({ message: 'Error adding product', type: 'e' });
        console.error('Error posting product', error);
      }
    });
  }

  postProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.post(url, product);
  }
  uploadImage(image: File, productId: any): void {
    const formData: FormData = new FormData();
    formData.append('file', image);
    formData.append('isDefault', 'true');
    formData.append('productId', productId);

    this.http.post(`${this.apiUrl}/upload-image`, formData)
      .subscribe({
        next: (response: any) => {
          console.log('Image uploaded successfully', response);
        },
        error: (error) => {
          this.table.messages.push({ message: 'Error uploading image', type: 'e' });
          console.error('Error uploading image:', error);
        }
      });
  }

  displayModel() {
    this.showModal = !this.showModal;
  }

  ngAfterViewInit():void {
    this.cdr.detectChanges();
  }
}