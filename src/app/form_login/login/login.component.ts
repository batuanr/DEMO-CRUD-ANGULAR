import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import {LoginForm} from '../../model/LoginForm';










@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: any = {};
  loginForm: LoginForm;
  status = 'Please fill in the form to Login!';
  isCheckLoginFailed = false;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.loginForm = new LoginForm(
      this.form.username,
      this.form.password
    );
    this.authService.signIn(this.loginForm).subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data.token != undefined){
        this.tokenService.setTokenKey(data.token);
        this.tokenService.setNameKey(data.name);
        this.tokenService.setRoleKey(data.roles);
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      } else {
        this.isCheckLoginFailed = true;
        this.status = 'LOGIN FAILED! Please try again!'
      }
    })
  }
}
