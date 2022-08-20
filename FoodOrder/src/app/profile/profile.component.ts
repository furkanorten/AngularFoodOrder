import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, public userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateUserForm = this.fb.group(
    {
      email: [this.userService.user.email, [Validators.required, Validators.email]],
      fullName: [this.userService.user.fullName, [Validators.required]],
      address: [this.userService.user.address, [Validators.required]],
      phone: [this.userService.user.phone, [Validators.required]],
      password: [this.userService.user.password, [Validators.required, Validators.minLength(8)]],
      orders: [this.userService.user.orders],
      id: [this.userService.user.id]
    }
  )

  get control(): { [key: string]: AbstractControl } {
    return this.updateUserForm.controls
  }

  updateAccount() {
    this.userService.updateUser(this.updateUserForm.value).subscribe(res => {
      this._snackBar.open("Your profile is updated", 'OK', { duration: 5000 })
      this.userService.getUserById(this.updateUserForm.value.id).subscribe(res => {
        if (res[0].id === this.updateUserForm.value.id) {
          this.userService.user = res[0]
          localStorage.setItem('user', JSON.stringify(res[0]))
        }
        else {
          this._snackBar.open('Error while updating profile', 'OK')
        }
      })
    })
  }

  returnBack() {
    this.router.navigateByUrl('/home')
  }

}
