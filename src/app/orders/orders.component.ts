import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  orderList: Array<any> = []
  password: any
  rateForm = new FormControl<number | null>(null, Validators.required);

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.orderList = this.userService.user.orders
  }

  returnBack() {
    this.router.navigateByUrl('/home')
  }

  rateOrder(index: number) {
    this.orderList[index].rate = this.rateForm.value
    this.userService.user.orders = this.orderList
    this.userService.updateUser(this.userService.user).subscribe(res => {
      this.userService.getUserById(this.userService.user).subscribe(res => {
        if (res[0].id === this.userService.user.id) {
          this.userService.user = res[0]
          localStorage.setItem('user', JSON.stringify(res[0]))
        }
      })
    })
    localStorage.setItem('user', JSON.stringify(this.userService.user))
  }

}
