import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;
  register = false;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      cellular: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      r_password: ['', Validators.required]
    }, {
      validator: this.passwordMatch('password', 'r_password')
    });
    this.registrationForm.reset();
  }


  get form() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.register = true;

    // stop here if form is invalid
    if (this.registrationForm.valid) {
      console.log('form ok ');
      this.router.navigateByUrl('home');
    } else {
      console.log('form invalid ');
    }
  }


  // custom validator to check that two fields match
  passwordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.match) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({match: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


}


