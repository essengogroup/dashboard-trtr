import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDroped:boolean = true;
  currentUser!:string

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    let user= JSON.parse(localStorage.getItem('user')!);

    this.currentUser= user.displayName?user.displayName:user.email;
  }

  onDropDown() {
    this.isDroped=!this.isDroped
  }

  onSignOut() {
    this.authService.SignOut().then(r=>{})
  }
}
