import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, public userService: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  )

  get control(): { [key: string]: AbstractControl } {
    return this.loginForm.controls
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.getUser(this.loginForm.value.email).subscribe(res => {
      if (res.length == 0) {
        this._snackBar.open('Email is not found', 'OK')
      }
      else {
        if (res[0].password === this.loginForm.value.password) {
          this.userService.user = res[0]
          localStorage.setItem('user', JSON.stringify(res[0]))
          this.userService.cart.restaurantId = '0'
          this.userService.cart.products = []
          this.userService.cart.date = ''
          localStorage.setItem('cart', JSON.stringify(this.userService.cart))
          this.router.navigateByUrl('/home')
        }
        else {
          this._snackBar.open('Password is wrong', 'OK')
        }
      }
    })
  }

}
