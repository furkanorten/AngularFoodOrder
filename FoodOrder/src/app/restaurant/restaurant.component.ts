import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurantId: any

  constructor(public userService: UserService, public restaurantService: RestaurantService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId')
    this.restaurantService.getRestaurant(this.restaurantId).subscribe(res => {
      this.restaurantService.restaurant = res
    })
  }

  returnBack() {
    this.router.navigateByUrl('/home')
  }

  addToCart(productId: number, name:string) {
    if(this.restaurantId == this.userService.cart.restaurantId || this.userService.cart.restaurantId == '0') {
      this.userService.cart.restaurantId = this.restaurantService.restaurant.id
      this.userService.cart.products.push(productId)
      localStorage.setItem('cart', JSON.stringify(this.userService.cart))
      this._snackBar.open(name + ' added to your cart', 'OK', {duration: 5000})

    }
    else {
      this._snackBar.open("You have already some products from another restaurant in your cart", 'OK', {duration: 5000})
    }

  }

}
