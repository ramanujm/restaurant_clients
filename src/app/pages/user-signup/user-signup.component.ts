import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit{



  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  toastrService = inject(ToastrService);

  signupForm! : FormGroup;

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]]
    });

  }

  register() {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe({
      next:(res) => {
        this.toastrService.success('You are registerd successfully', 'Success', {closeButton: true, timeOut:1000, positionClass:'toast-top-center'});
        console.log(res);
      },
      error: (e) => {
        this.toastrService.warning('Error at our end, Try again later', 'Warning', {closeButton: true, timeOut:1000, positionClass:'toast-top-center'});
        console.error(e);
      }
    });

  }

  passwordMatchValidator = (control: FormControl): {[s:string]: boolean} => {
    if(!control.value) {
      return {required: true};
    }else if(control.value !== this.signupForm.controls['password'].value){
      return {confirm: true, error: true};
    }
    return {};
  }

}
