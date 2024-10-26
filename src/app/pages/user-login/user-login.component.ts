import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit{

  authService= inject(AuthService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastrService = inject(ToastrService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login() {
    console.log("login clicked");
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.userId !== null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          console.log(user);
          StorageService.saveToken(res.jwt);
          StorageService.saveUser(user);
          if(StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("customer/dashboard");
          }else {
            console.log("Bad credentials...");
          }
        }
      },
      error: (e) => {
        console.error(e);
        this.toastrService.warning('Wrong email or password, Try again!', 'Warning', {closeButton: true, timeOut:1000, positionClass:'toast-top-center'});
      }
    });

  }

}
