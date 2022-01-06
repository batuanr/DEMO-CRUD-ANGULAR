import { Component, OnInit} from '@angular/core';
import {Product} from '../model/Product';
import {ProductService} from '../service/product/product.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit{
  numPage: number[] = [1, 2, 3, 4, 5];
  count: number;
  totalElements = 0;
  totalPage: number;
  pageNumber: number;
  page1: any = {
    page: 0,
    size: 4
  };
  products: Product[] = [];
  searchText = '';
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.page(this.page1, this.searchText);
  }
  page(page, search){
    this.productService.page(page, this.searchText).subscribe(data => {
      // console.log(data['number'])
      this.pageNumber = (data['number']);
      this.totalPage = data['totalPages']
      this.products = data['content'];
      // console.log('data[content]', data);
      // tslint:disable-next-line:radix
      this.count = parseInt(String((this.pageNumber + 1) / 5)) * 5;
      this.totalElements = data['totalElements']


    })
  }
  // nextPage(event: PageEvent) {
  //   console.log('event -->', event);
  //   const nextPage = {};
  //   nextPage['page'] = event.pageIndex.toString();
  //   nextPage['size'] = event.pageSize.toString();
  //   console.log('request[size]', nextPage['size']);
  //   this.page(nextPage);
  // }
  nextPage(){
    this.page1.page += 1;
    this.page(this.page1, this.searchText);
  }
  previousPage(){
    this.page1.page -= 1;
    this.page(this.page1, this.searchText);
  }
  selectPage(page: number){
    this.page1.page = page;
    this.page(this.page1, this.searchText);
  }
  search(){
    this.page1.page = 0;
    this.page(this.page1, this.searchText);
  }
}
