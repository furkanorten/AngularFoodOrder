import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

interface Cart {
  restaurantId: string
  products: Array<any>
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  public user: any

  public cart: Cart = {
    restaurantId: '0',
    products: [],
    date: ''
  }

  public localCart: any

  constructor(private baseService: BaseService) {
    super(baseService.http)
    this.localCart = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cart.restaurantId = this.localCart.restaurantId
    this.cart.products = this.localCart.products
    this.cart.date = this.localCart.date
  }

  public createAccount(userObj: any) {
    return this.postReq('/users', userObj)
  }

  public getUser(email: any) {
    return this.getReq('/users?email='+email)
  }

  public getUserById(id: any) {
    return this.getReq('/users?id='+id)
  }

  public updateUser(userData: any) {
    return this.baseService.putReq('/users/' + userData.id, userData)
  }

}
