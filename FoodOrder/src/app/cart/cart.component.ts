import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  restaurant:any
  totalPrice = 0
  prices: Array<number> = []

  constructor(public userService: UserService, public restaurantService: RestaurantService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.userService.cart.restaurantId != '0') {
      this.restaurantService.getRestaurant(this.userService.cart.restaurantId).subscribe(res => {
        this.restaurant = res
        for(let i=0; i<this.userService.cart.products.length; i++) {
          this.totalPrice += this.restaurant.products[this.userService.cart.products[i]-1].price
        }
      })
    }
  }

  deleteFromCart(index: number) {
    this.userService.cart.products.splice(index, 1)
    this.totalPrice = 0
    if(this.userService.cart.products.length == 0) {
      this.userService.cart.restaurantId = '0'
    }
    else {
      for(let i=0; i<this.userService.cart.products.length; i++) {
        this.totalPrice += this.restaurant.products[this.userService.cart.products[i]-1].price
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.userService.cart))
  }

  returnBack() {
    this.router.navigateByUrl('/home')
  }

  order() {
    let productNames = []
    for(let i=0; i<this.userService.cart.products.length; i++) {
      this.prices.push(this.restaurant.products[this.userService.cart.products[i]-1].price)
      productNames.push(this.restaurant.products[this.userService.cart.products[i]-1].name)
    }
    const curr_date = new Date()
    let orderObj = {
      restaurantName: this.restaurant.name,
      products: productNames,
      prices: this.prices,
      totalPrice: this.totalPrice,
      date: curr_date,
      rate: 0
    }
    this.userService.user.orders.push(orderObj)
    this.userService.updateUser(this.userService.user).subscribe(res => {
      this._snackBar.open("Your order is complete", 'OK', { duration: 5000 })
      this.userService.getUserById(this.userService.user.id).subscribe(res => {
        console.log(res[0])
        if (res[0].id === this.userService.user.id) {
          this.userService.user = res[0]
          localStorage.setItem('user', JSON.stringify(res[0]))
        }
        else {
          this._snackBar.open('Error while ordering', 'OK')
        }
      })
    })
    this.userService.cart.restaurantId = '0'
    this.userService.cart.products = []
    this.userService.cart.date = ''
    localStorage.setItem('cart', JSON.stringify(this.userService.cart))
    this.router.navigateByUrl('/orders')
  }


}
