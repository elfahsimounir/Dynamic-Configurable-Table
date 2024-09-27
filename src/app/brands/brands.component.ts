import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../componenets/table/services/data/products.service';
import { TableService } from '@TableServices';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@TableComponenets';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, AlertComponent, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  dataBrand: any = [];
  paginatedBrands: any[] = [];
  filteredBrands: any[] = [];
  alerts: any = []
   api = environment.API_URL_IMAGE
  bannerFile: any;
  logoFile: any
  banner: any;
  logo: any

  selectedBrand: any
  temporaryBrand: any

  brandTtitle: any;
  brandDescription: any;
  add: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalItems: number = 0;
  totalPages!: number;

  searchQuery: string = '';
  constructor(
    private productService: ProductsService,
    private table: TableService
  ) { }
  ngOnInit(): void {
    this.refresh()
  }
  getBrands() {
    this.productService.getBrand().subscribe(
      (response) => {
        this.dataBrand = response
        this.totalItems = response.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.filterBrands();
      },
      (error) => {
        console.error('Error fetching brands', error);
      });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBrands = this.filteredBrands.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.paginate();
    }
  }
  filterBrands() {
    this.filteredBrands = this.dataBrand.filter((brand: any) =>
      brand.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginate();
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    this.filterBrands();
  }
  switch() {
    this.add = !this.add;
    this.brandDescription = null
    this.brandTtitle = null;
  };

  onFileChange(event: any, type: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (type === 'logo') {
        this.logoFile = file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.bannerFile = file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.banner = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async addBrand() {
    // console.log(this.brandTtitle, this.brandDescription)
    if (this.brandTtitle) {
      let form = { title: this.brandTtitle, description: this.brandDescription }
      try {
        const response = await this.productService.postBrand(form);
        if (response) {
          this.refresh();
          this.alerts.push(
            {
              type: 's',
              message: 'Brand added successfully'
            }
          );
          this.brandTtitle = null;
          this.brandDescription = null
        }
      } catch (error) {
        console.error('Error adding brand', error);
        this.alerts.push(
          {
            type: 'e',
            message: 'Failed adding brand!'
          }
        );
      }
    }
  }

  async onSubmit(type: any) {
    if (this.logoFile || this.bannerFile) {
      let formData: any = new FormData();
      formData.append("file", type === 'logo' ? this.logoFile : this.bannerFile);
      formData.append(type, 1);
      try {
        const response: any = await this.productService.patchBrand({ id: this.selectedBrand.id, form: formData });
        console.log('Response:', response);
        this.alerts.push(
          {
            type: 's',
            message: 'Brand Image uploaded successfully'
          }
        );
        this.banner = null;
        this.logo = null;
        this.bannerFile = null;
        this.logoFile = null;
        this.refresh();
      } catch (error) {
        console.error('Error uploading image', error);
        this.alerts.push(
          {
            type: 'e',
            message: 'Failed uploading brand image!'
          }
        );
      }
    } else {
      this.alerts.push(
        {
          type: 'e',
          message: 'No image provided!'
        }
      );
    }
  }
  updateBrand() {
    if (this.selectedBrand) {
      const data = {
        id: this.selectedBrand.id,
        form: {
          title: this.selectedBrand.title,
          description: this.selectedBrand.description
        }
      };
      this.productService.patchBrandData(data).subscribe({
        next: response => {
          console.log('Brand updated successfully', response);
          this.refresh()
          this.alerts.push(
            {
              type: 's',
              message: 'Brand updated successfully!'
            })
        },
        error: error => {
          console.error('Error updating brand:', error);
          this.alerts.push(
            {
              type: 'e',
              message: 'Failed Updating brand!'
            }
          )
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  async onDelete(id: string) {
    if (id &&confirm('Confirm deleting brand!')) {
      try {
        const response: any = await this.productService.deleteBrand(id);
        console.log('Response:', response);
        this.alerts.push(
          {
            type: 's',
            message: 'Brand deleted successfully'
          }
        );
        this.refresh();
        this.selectedBrand=null
      } catch (error) {
        console.error('Error deleting brand:', error);
        this.alerts.push(
          {
            type: 'e',
            message: 'Failed to delete brand!'
          }
        );
      }
    }
  }
  setSelected(item: any) {
    if (this.selectedBrand?.id !== item?.id) {
      this.banner = null
      this.bannerFile = null
      this.logo = null
      this.logoFile = null
      this.selectedBrand = item
    }else{
      this.selectedBrand=null

    }

    this.temporaryBrand = { ...this.selectedBrand }
  }

  refresh() {
    this.getBrands()
  }
} 