import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {

    let localUser = localStorage.getItem('user')
    if(localUser != null) {
      this.userService.user = JSON.parse(localUser)
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }

  logout() {
    this.userService.user = undefined
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login')
  }
}
