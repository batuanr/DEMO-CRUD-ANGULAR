import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../model/Product';
import {ProductService} from '../service/product/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'avatar', 'category' , 'edit' , 'delete'];
  dataSource: any;
  products: Product[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  status: any;
  constructor(private productService: ProductService,
              private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getListCategory();
    this.status = this.productService.getStatus();
  }
  getListCategory(){
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteCategory(id: number) {
    this.productService.delete(id).subscribe(() =>{
      this.getListCategory();
    })
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCategory(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
