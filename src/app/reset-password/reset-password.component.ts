import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ConfirmPasswordValidators } from '../customValidators/ConfirmPasswordValidators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router,
    private authService:AuthService , private tokenStorage: TokenService) { }
  
  registerForm = this.formbuilder.group({
    oldPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },
    { validator: [ConfirmPasswordValidators] }
  )

//OldPassword
get OLDPASS() {
  return this.registerForm.get('oldPassword');
}
  //password
  get PASS() {
    return this.registerForm.get('password');
  }

  //conirm password
  get CONFIRMPASS() {
    return this.registerForm.get('confirmPassword');
  }

  ngOnInit(): void {
  }
  errorMessage = '';

  resetPassword(){
    let username=this.tokenStorage.getUser();
    this.authService.resetPassword(username,this.OLDPASS?.value,this.PASS?.value).subscribe(
      ()=>{
        this.router.navigate(['/login'])
      }
      ,err=>{
        this.errorMessage = "كلمة المرور غير صحيحة";

      }
    );
  }

}
