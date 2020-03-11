import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {  AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  allUserDetails;
  userDetails;
  constructor(private service: AuthServiceService, private router: Router) {
    this.loginForm=new FormGroup({
      userName : new FormControl('emp1@gmail.com', Validators.required),
      password: new FormControl('123', Validators.required)
    })
   }

  ngOnInit() {
  }
  login(){
    this.allUserDetails=this.service.getUserDetails();
    var userName=this.loginForm.value.userName
    this.userDetails = this.allUserDetails.find(function (userDetails) { return userDetails.userName === userName})
    if(this.userDetails == undefined)
    {
      alert("Please enter valid user name");
      return false;
    }
    if (this.userDetails.pwd != this.loginForm.value.password)
    {
      alert("Please enter valid password");
      return false;
    }
    localStorage.setItem('userDetails',JSON.stringify(this.userDetails));
    this.router.navigateByUrl('dashboard')
  }
}
