import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SignUpForm} from '../../model/SignUpForm';
import {AuthService} from '../../service/auth.service';
import {ErrorStateMatcher} from '@angular/material/core';
export class Myerror implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  matcher = new Myerror();
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  signUpForm: SignUpForm;
  error1: any = {
    message: 'no_user'
  };
  error2: any = {
    message: 'no_email'
  };
  success: any = {
    message: 'yes'
  };
  status = 'Please fill in the form to Register!';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(6), Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {validators: this.checkPasswords},
    );
  }

  ngOnInit(): void {
  }

  ngSubmit(form: FormGroup) {
    this.signUpForm = new SignUpForm(
      form.controls.name.value,
      form.controls.username.value,
      form.controls.email.value,
      form.controls.password.value
    );
    this.authService.signUp(this.signUpForm).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'The username is existed! Please try!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'The email is existed! Please try!';
      }
      if (JSON.stringify(data) === JSON.stringify(this.success)) {
        this.status = 'Create account success!';
      }
    });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

}
