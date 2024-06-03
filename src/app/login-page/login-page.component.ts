import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get emailControl() {
    return this.loginForm?.get('email');
  }
  get passwordControl() {
    return this.loginForm?.get('password');
  }

  login() {
    this.isLogin = true;
    const storedEmail = 'admin@gmail.com'; 
    const storedPassword = 'admin123456'; 
    const inputEmail = this.emailControl?.value;
    const inputPassword = this.passwordControl?.value;

    if (inputEmail === storedEmail && inputPassword === storedPassword) {
      localStorage.setItem('email', inputEmail); 
      localStorage.setItem('password', inputPassword); 
      this.router.navigate(['/exchange']);
    } else {
      alert('Email or password is incorrect')
      this.passwordControl?.reset(); 
    }
  }
}
