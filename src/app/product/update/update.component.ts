import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/Product';
import {count} from 'rxjs/operators';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  product: Product;
  error1: any = {
    message: 'no_name'
  };
  success: any = {
    message: 'update_success'
  };
  status: any;
  form: any;
  categories: any;
  constructor(
    private categoryService: CategoryService,
    private atRouter: ActivatedRoute,
    private ps: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    this.atRouter.paramMap.subscribe( param => {
      const id = +param.get('id');
      this.ps.getOne(id).subscribe(data => {
        this.product = data;
      });
    });
  }


  ngSubmit() {
    this.ps.update(this.product.id, this.product).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)){
        this.status = 'The product is existed! Please try again!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)){
        this.ps.setStatus('Update success !');
        this.router.navigate(['product']);
      }
    });
  }

  onUploadAvatar(event: string) {
    this.product.avatar = event;
  }
}
