import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authSer:AuthenticationService,private router:Router) { }
  // isLogged:boolean= true;
  ngOnInit(): void {
    // this.isLogged = true;
    // this.router.navigateByUrl("/login");
  }

  login(){
    this.router.navigateByUrl("/login");
  }

}
