import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.loginForm=this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',Validators.required),
    })
  }

  onSubmit() {
    const userData=this.loginForm.value;

    this.authService.SignIn(userData.email,userData.password).then(r=>{console.log(r)})
  }

  onGoogle() {
    this.authService.GoogleAuth().then(r=>console.log(r))
  }
}
