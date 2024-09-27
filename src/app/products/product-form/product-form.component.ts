import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup | any;
  selectedImage!: File | any;
  previewSource: string | ArrayBuffer | null = '';
  @Input()  loading !:boolean;
  @Input()  dataBrand!: any[];
  @Input()  dataCategory!: any[];
  @Input() show!: boolean;
  @Output() closeM: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitProduct: EventEmitter<any> = new EventEmitter<any>();

  rating = [
    { id: 1, value: '1', name: 'very poor' },
    { id: 2, value: '2', name: 'poor' },
    { id: 3, value: '3', name: 'medium' },
    { id: 4, value: '4', name: 'high' },
    { id: 5, value: '5', name: 'max' }
  ];
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
      discount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      rating: ['', Validators.required],
      winCode: ['', Validators.required],
      new: [false],
      pub: [false],
      promotion: [false],
      sale: [false],
      image: [null, Validators.required]
    });
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewSource = reader.result;
      };
    }
  }
  onSubmit(): void {
      const formData = this.productForm.value;
      this.submitProduct.emit({ formData, selectedImage: this.selectedImage });
      console.log('submited',formData,this.selectedImage)
      this.clearForm();
  }
  clearForm(): void {
    this.productForm.reset();
    this.previewSource = '';
    this.selectedImage = undefined;
  }
  close() {
    this.closeM.emit()
  }
  ngAfterViewInit(): void {
  this.cdr.detectChanges()
  }
}
