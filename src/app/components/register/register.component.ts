import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.registerForm=this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',Validators.required),
    })
  }

  onSubmit() {
    const userData=this.registerForm.value;

    this.authService.SignUp(userData.email,userData.password).then(r=>{console.log(r)})
  }
}
