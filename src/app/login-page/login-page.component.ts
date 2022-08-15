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

  
  constructor(private fornmbuilder: FormBuilder ,
     private router:Router,private authService:AuthService,
     private tokenStorage: TokenService) { }

  loginForm = this.fornmbuilder.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    pass: ['', [Validators.required]]
  })


  //email preperty
  get USERNAME() {
    return this.loginForm.get('username');
  }

  //name property
  get PASS() {
    return this.loginForm.get('pass');
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()!=null){
      this.isLoggedIn = true;
    }
    if(this.isLoggedIn){
      this.router.navigate(['home']);

    }
  }
  isLoggedIn = false;
  errorMessage = '';

  sumbitUsername(){
    if (this.USERNAME != null && this.PASS != null) {
      this.authService.login(this.USERNAME.value,this.PASS.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.isLoggedIn = true;
          this.router.navigate(['home']);
        },
        err => {
          this.errorMessage = "خطأ في اسم المستخدم او كلمة سر";
        }
  
      );
      
      
    }
  }

}
