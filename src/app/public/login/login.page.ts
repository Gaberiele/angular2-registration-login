import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {
  }

  submitted = false;
  loginForm: FormGroup;
  user: string;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.reset();
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.user = this.loginForm.controls.username.value;
      console.log(this.user);
      localStorage.setItem('user', this.user);
      this.router.navigateByUrl('home');
    } else {
      console.log('form invalid ');

    }


  }

}



