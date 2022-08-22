import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurantList: Array<any> = []

  constructor(public restaurantService: RestaurantService, public userService: UserService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(res => {
      this.restaurantList = res
    })
  }

}
