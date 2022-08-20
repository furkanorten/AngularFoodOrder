import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, public userService: UserService) { }

  ngOnInit(): void {
  }

  createUserForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      orders: [[]]
    }
  )

  get control(): {[key:string]: AbstractControl} {
    return this.createUserForm.controls
  }

  createAccount() {
    this.userService.createAccount(this.createUserForm.value).subscribe(res => {
    })
  }

}
