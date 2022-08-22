import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends BaseService{

  public restaurant: any

  constructor(private baseService: BaseService) {
    super(baseService.http)
  }

  public getRestaurants() {
    return this.getReq('/restaurants')
  }

  public getRestaurant(id:string) {
    return this.getReq('/restaurants/'+id)
  }
}
