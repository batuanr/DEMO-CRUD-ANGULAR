import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product/product.service';
import {Product} from '../model/Product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private atRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe( param => {
      const id = +param.get('id');
      this.productService.getOne(id).subscribe(data => {
        this.product = data;
      });
    });
  }

}
