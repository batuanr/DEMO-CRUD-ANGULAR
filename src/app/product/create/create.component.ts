import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../../service/product/product.service';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/Category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: any = {};
  product: Product;
  categories: Category[] = [];
  status: any;
  error1: any = {
    message: 'no_name'
  };
  error2: any = {
    message: 'no_avatar'
  };
  success: any = {
    message: 'create_success'
  };
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
  ngSubmit(){
   console.log(this.form.id);
   this.product = new Product(
      this.form.name,
      new Category(this.form.id),
      this.form.avatar
    );
   this.productService.create(this.product).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)){
        this.status = 'The name is existed! Please try again!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)){
        this.status = 'Please upload avatar!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)){
        this.productService.setStatus('create success');
        this.router.navigate(['product']);
      }
    });
  }
  onUploadAvatar($event: string) {
    this.form.avatar = $event;
  }
}
