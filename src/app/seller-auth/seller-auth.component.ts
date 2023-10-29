import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-types';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: String = '';

  constructor(private seller: SellerService, private router: Router) {}

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(): void {
    console.log('signUpForm', this.signUpForm.value);
    let data = this.signUpForm?.value ? this.signUpForm?.value : []
    this.seller.userSignUp(data);
  }

  login(data: any): void {
    console.log("data", data)
    this.seller.userLogin(data.value);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is not correct';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
