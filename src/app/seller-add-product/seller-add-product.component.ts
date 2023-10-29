import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  productForm: FormGroup;
  imageBase64: string | null = null;

  productCategoryForm: FormGroup;
  selectedImages: File[] = []; // Array to store selected images
  categoryImageBase64: string | null = null;

  base64Images: string[] = [];
  category: any;

  constructor(private product: ProductsService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      categoryName: [''],
      categoryImage: [''],
      color: [''],
      description: [''],
      image: [''],
      id: [''],
      quantity: [''],
      productId: [''],
    });

    this.productCategoryForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
    });
  }

  productCategoriesList: any

  ngOnInit(): void {
    this.product.getAllProductCategories().subscribe((data) => {
      this.productCategoriesList = data;
      console.log("productCategoriesList", this.productCategoriesList)
    });
  }

  

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e?.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Define new dimensions and compression quality
          const newWidth = 1000;
          const newHeight = 1000;
          const quality = 0.8; // Specify the desired image quality (0.0 to 1.0)
  
          // Set the canvas size
          canvas.width = newWidth;
          canvas.height = newHeight;
  
          // Draw the image onto the canvas with the new dimensions
          ctx?.drawImage(img, 0, 0, newWidth, newHeight);
  
          // Convert the canvas content to a base64 string with compression
          this.imageBase64 = canvas.toDataURL('image/jpeg', quality); // Use 'image/jpeg' for JPEG format
          
          // You can specify the desired image format and quality
          this.categoryImageBase64 = this.imageBase64;
        };
      };
      reader.readAsDataURL(file);
    }
  }
  
  

  onSubmit() {
    const productData = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      category: {
        name: this.productForm.value.categoryName,
        image: this.imageBase64 || '',
      },
      color: this.productForm.get('color')?.value,
      description: this.productForm.get('description')?.value,
      image: this.imageBase64 || '',
      id: this.productForm.get('id')?.value,
      quantity: this.productForm.get('quantity')?.value,
      productId: this.productForm.get('productId')?.value,
    };

    console.log('formdata', productData);
    if (productData) {
      this.product.addProduct(productData).subscribe(
        (response) => {
          console.log('Product created successfully:', response);
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }

  onSubmitCategories() {
    const productCategoryData = {
      name: this.productCategoryForm.get('name')?.value,
      image: this.categoryImageBase64 || '',
    };

    if (productCategoryData) {
      this.product.addProductCategory(productCategoryData).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.productCategoryForm.reset();
          this.selectedImages = []; // Clear the selected images array
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }
}
