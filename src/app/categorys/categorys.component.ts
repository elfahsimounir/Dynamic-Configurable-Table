import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../componenets/table/services/data/products.service';
import { TableService } from '@TableServices';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AlertComponent } from '@TableComponenets';
@Component({
  selector: 'app-categorys',
  standalone: true,
  imports: [CommonModule, FormsModule,AlertComponent],
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.scss'
})
export class CategorysComponent implements OnInit{
  categories: any = []
  subCategories: any = []
  selectedCategory: any
  selectedCategory2: any
  api = `${environment.API_URL_IMAGE}`
  cateName!: string;
  cateName2!: string;
  imageUrl: string | ArrayBuffer | null = null;
  cateImageUrl: any
  addCate = false
  image: any;
  Bannerimage: any;
  bannerFile: any;
  sub2Name: any;
  temproraryTitle:any;
  selectedSub: any
  alerts:any=[]
  nameSave!:boolean;
  constructor(
    private productService: ProductsService,
    private cdr: ChangeDetectorRef,
    private table: TableService,
  ) {}
  ngOnInit(): void {
    this.refresh()
  }
  getCategories() {
    this.productService.getCategory().subscribe(
      (response) => {
        this.categories = this.buildCategoryTree(response.categories)
        const categoryTree = this.buildCategoryTree(response.categories).filter((item:any)=>item?.id===this.selectedCategory?.id)[0];
       this.selectedCategory=categoryTree
       this.temproraryTitle=categoryTree?.title
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  buildCategoryTree(categories: any): any {
    // Step 1: Remove duplicates
    const uniqueCategories = categories.reduce((acc: any, category: any) => {
      if (!acc.some((cat: any) => cat.id === category.id)) {
        acc.push(category);
      }
      return acc;
    }, []);

    // Step 2: Create a map for quick access
    const categoryMap = new Map();
    uniqueCategories.forEach((category: any) => {
      category.subCategories = [];
      categoryMap.set(category.id, category);
    });

    // Step 3: Build the tree using parentId
    const rootCategories: any = [];
    uniqueCategories.forEach((category: any) => {
      if (category.parentId === null) {
        rootCategories.push(category);
      } else {
        const parentCategory = categoryMap.get(category.parentId);
        if (parentCategory) {
          parentCategory.subCategories.push(category);
        } 
        // else {
        //   // Handle case where parent doesn't exist (optional)
        //   console.warn(`Parent category ${category.parentId} not found for category ${category.title}`);
        // }
      }
    });
    const arr = []
    rootCategories.forEach((item: any) => {

      item.subCategories.forEach((item1: any) => {

        this.subCategories.forEach((item2: any) => {
          if (item1.id === item2.categoryId) {
            item1.subCategories.push(item2)
          }
        })
      })

    })
    return rootCategories;
  }
  updateCategory(){
    if (this.selectedCategory) {
      const data = {
        id: this.selectedCategory.id,
        form: {
          title: this.selectedCategory.title,
        }
      };

      this.productService.patchCategoryData(data)
        .then(response => {
          console.log('Category updated successfully:', response);
          this.refresh()
          this.temproraryTitle=null
          this.alerts.push(
            {
              type:'s',
              message:'Category updated successfully!'
            })
        })
        .catch(error => {
          console.error('Error updating category:', error);
          this.alerts.push(
            {
              type:'e',
              message:'Failed Updating category!'
            }
          )
        });
    } else {
      console.error('Form is invalid');
    }
  }
  selectCategory(item: any) {
    if (item?.id !== this.selectedCategory?.id) {
      this.selectedCategory = item
      this.temproraryTitle=item.title
    } else {
      this.selectedCategory = null
    }
    this.addCate = false;
    this.cateName='';
     this.cateName2='';
    this.imageUrl = null;
    this.image='';
    this.Bannerimage='';
    this.bannerFile='';
    this.sub2Name='';
    this.selectedSub=null
    console.log(this.selectedCategory)
  }
  addCategory() {
    this.selectedCategory = null;
    this.addCate = !this.addCate;
  }
  save() {
    this.productService.postCategory({ title: this.cateName })
      .then(response => {
        this.cateName = '';
        console.log('Response:', response);
        this.alerts.push(
          {
            type:'s',
            message:'Category have added successfully!'
          }
        )
        this.refresh()
      })
      .catch(error => {
        console.error('Error:', error);
        this.alerts.push(
          {
            type:'e',
            message:'Failed adding category!'
          }
        )
      });
  }

  deletedCategory() {
    if (confirm("Are you sure you want to delete this category?")) {
      this.productService.deleteCategory(this.selectedCategory.id).then(
        () => {
          this.refresh()
          this.selectedCategory=null
          this.alerts.push(
            {
              type:'s',
              message:'Category have deleted successfully!'
            }
          )
        },
        (error) => {
          console.error('Error deleting category', error);
          this.alerts.push(
            {
              type:'e',
              message:'Failed deleting category!'
            }
          )
        }
      );
    }

  }
  getSubCategories() {
    this.productService.getSubCategory().subscribe(
      (response) => {

        this.subCategories = response.subCategories
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onFileChange(event: any, type: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (type === 'i') {
        this.imageUrl = file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.bannerFile = file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.Bannerimage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }


  async onSubmit(type: any) {
    if (this.imageUrl || this.bannerFile) {
      let formData: any = new FormData();
      formData.append("file", type === 'i' ? this.imageUrl : this.bannerFile);
      formData.append("type", type === 'i' ? 'icon' : 'image')
      try {
        await this.productService.patchCategory({ id: this.selectedCategory.id, form: formData });
        this.alerts.push(
          {
            type:'s',
            message:' Category Image uploaded successfully'
          }
        )
        this.imageUrl=null
        this.bannerFile=null
        this.image=null;
        this.Bannerimage=null
        this.refresh()
      } catch (error) {
        // Handle error response
        console.error('Error uploading image', error);
        this.alerts.push(
          {
            type:'e',
            message:'Failed uploading category image!'
          }
        )
      }
    }
  }

  selectSub(item: any) {
if(this.selectedSub){
  this.selectedSub=null
}else{
   this.selectedSub=item
}}
  async addSub2(item: any) {
    if (item) {
      let form = { title: this.sub2Name, categoryId: item?.id }
      try {
        await this.productService.postSubCategory(form);
        this.alerts.push(
          {
            type:'s',
            message:'Sub Category added successfully'
          }
        )
        this.sub2Name='';
        this.refresh()
      } catch (error) {
        // Handle error response
        console.error('Error adding sub category', error);
        this.alerts.push(
          {
            type:'e',
            message:'Failed adding sub category!'
          }
        )
      }
    }

  }
  async addSub() {
    if (this.selectedCategory) {
      let form = { title: this.cateName2, parentId: this.selectedCategory?.id }
      try {
        const response = await this.productService.postCategory2(form);    
        // Check if response is successful before refreshing
        if (response) {
          this.refresh();
          this.alerts.push(
            {
              type: 's',
              message: 'Category added successfully'
            }
          );
          this.cateName2 = '';
          // this.refreshSelectedCategory()
        } 
      } catch (error) {
        // Handle error response
        console.error('Error adding category', error);
        this.alerts.push(
          {
            type: 'e',
            message: 'Failed adding category!'
          }
        );
      }
    }
  }
  // refreshSelectedCategory() {
  //   if (this.selectedCategory) {
  //     this.productService.getCategoryById(this.selectedCategory.id).subscribe(
  //       (response) => {
  //         // this.selectedCategory = response.category;
  //         console.log('refresh',response.category)
  //       },
  //       (error) => {
  //         console.error('Error fetching selected category', error);
  //       }
  //     );
  //   }
  // }
refresh(){
  this.getCategories()
  this.getSubCategories() 
}
}
