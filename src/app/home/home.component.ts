import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private activeroute: ActivatedRoute, private tokenservice: TokenService) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenservice.signOut();
    this.router.navigate(['login']);
  }
}
