import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'restaurant_clients';

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();

  // router = Inject(Router);
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event.constructor.name === 'NavigationEnd') {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(): void {
    StorageService.signout();
    this.router.navigateByUrl('/login');
  }
}
