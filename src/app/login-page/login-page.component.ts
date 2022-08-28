import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(private fornmbuilder: FormBuilder,
    private router: Router, private authService: AuthService,
    private tokenStorage: TokenService) { }

  loginForm = this.fornmbuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    pass: ['', [Validators.required]]
  })


  //username preperty
  get USERNAME() {
    return this.loginForm.get('username');
  }

  //password property
  get PASS() {
    return this.loginForm.get('pass');
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken() != null) {
    //   this.isLoggedIn = true;
    // }
    // if (this.isLoggedIn) {
    //   this.router.navigate(['home/dashboard']);

    // }
    this.router.navigate(['home/dashboard']);
  }
  
  isLoggedIn = false;
  errorMessage = '';

  sumbitUsername() {
  //   if (this.USERNAME != null && this.PASS != null) {
  //     this.authService.login(this.USERNAME.value,this.PASS.value).subscribe(
  //       data => {
  //       if(data.role=="Admin"){    
  //           this.tokenStorage.saveToken(data.token);
  //           this.tokenStorage.saveUser(data.username);
  //           this.isLoggedIn = true;
  //           this.router.navigate(['home/dashboard']);
  //         }else{
  //           this.errorMessage = "خطأ في اسم المستخدم او كلمة سر";
  //         }
  //       },
  //       err => {
  //         this.errorMessage = "خطأ في اسم المستخدم او كلمة سر";
  //       }

  //     );

  // }
  this.router.navigate(['home/dashboard']);
}
}

