import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  
  constructor(private fornmbuilder: FormBuilder , private router:Router , private activeroute:ActivatedRoute) { }

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
  }

  sumbitUsername(){
    if (this.USERNAME != null && this.PASS != null) {
      var user = {
        title: this.USERNAME.value,
        description: this.PASS.value,
      }
      console.log(user);
      this.router.navigate(['home']);
    }
  }

}
