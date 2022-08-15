import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private tokenStorage:TokenService,private router:Router){}
  title = 'AshbalAlfanAdmin';
  isLoggedIn:Boolean=false;
  ngOnInit(): void {
    if(this.tokenStorage.getToken()!=null){
      this.isLoggedIn = true;
    }
    if(!this.isLoggedIn){
      this.router.navigate(['login']);
    }
    
  }
}
