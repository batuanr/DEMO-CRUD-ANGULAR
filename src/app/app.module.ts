import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './pages/home/home.component';
import { GettingStartedComponent } from './pages/gettingstarted/gettingstarted.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxAudioPlayerModule } from 'projects/ngx-audio-player/src/public_api';
import { MatButtonModule } from '@angular/material/button';

import {NavBarModule} from './shared/navbar';
import {FooterModule} from './shared/footer';
import { RegisterComponent } from './form_login/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './form_login/login/login.component';

import {AngularFireStorageModule} from '@angular/fire/storage';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { UploadComponent } from './upload/upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CreateComponent } from './product/create/create.component';
import { DeleteComponent } from './product/delete/delete.component';
import { UpdateComponent } from './product/update/update.component';
import {MatSelectModule} from '@angular/material/select';
import { DialogComponent } from './product/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {httpInterceptorProviders} from './security/auth.interceptor';
import {AuthGuard} from './security/auth.guard';
import { PageProductComponent } from './page-product/page-product.component';
import { ViewComponent } from './view/view.component';
import { CartComponent } from './cart/cart.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'guide/getting-started',
    component: GettingStartedComponent,
    data: { title: 'Getting Started' }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login', component: LoginComponent},
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'createProduct',
    component: CreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: PageProductComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  }
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, ProductComponent, CategoryComponent, UploadComponent, CreateComponent, DeleteComponent, UpdateComponent, DialogComponent, PageProductComponent, ViewComponent, CartComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    NavBarModule, FooterModule,
    NgxAudioPlayerModule,
    // tslint:disable-next-line:max-line-length
    RouterModule.forRoot(appRoutes, {useHash: false}), MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatDialogModule, MatTableModule, MatPaginatorModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
